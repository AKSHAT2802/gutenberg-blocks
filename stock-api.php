<?php
// Create this as stock-api.php in your plugin folder

class Stock_Tracker_API
{
    private $table_name;

    public function __construct()
    {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'stock_data';

        // Register REST API endpoints
        add_action('rest_api_init', [ $this, 'register_endpoints' ]);

        // Register activation hook for creating table
        register_activation_hook(__FILE__, [ $this, 'create_table' ]);
    }

    public function create_table()
    {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS {$this->table_name} (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            ltp decimal(10,2) NOT NULL,
            chg decimal(10,2) NOT NULL,
            chg_percent decimal(10,2) NOT NULL,
            ad_ratio decimal(10,2) NOT NULL,
            type varchar(50) NOT NULL,
            category varchar(50) NOT NULL,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        include_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);

        // Insert sample data if table is empty
        $this->insert_sample_data();
    }

    private function insert_sample_data()
    {
        global $wpdb;

        // Check if table is empty
        $count = $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name}");

        if ($count == 0 ) {
            $sample_data = [ 
            [ 
            'name'        => 'Nifty 50',
            'ltp'         => 23482.15,
            'chg'         => -26.25,
            'chg_percent' => -0.11,
            'ad_ratio'    => 0.67,
            'type'        => 'index',
            'category'    => 'indices'
            ],
            [ 
            'name'        => 'Nifty Bank',
            'ltp'         => 49506.95,
            'chg'         => -80.25,
            'chg_percent' => -0.16,
            'ad_ratio'    => 0.71,
            'type'        => 'index',
            'category'    => 'indices'
            ],
            [ 
            'name'        => 'Reliance',
            'ltp'         => 2456.75,
            'chg'         => 45.25,
            'chg_percent' => 1.87,
            'ad_ratio'    => 1.23,
            'type'        => 'stock',
            'category'    => 'gainers'
            ],
            // Add more sample data as needed
            ];

            foreach ( $sample_data as $data ) {
                $wpdb->insert($this->table_name, $data);
            }
        }
    }

    public function register_endpoints()
    {
        // Get all stocks
        register_rest_route(
            'stock-tracker/v1', '/stocks', [ 
            'methods'             => 'GET',
            'callback'            => [ $this, 'get_stocks' ],
            'permission_callback' => '__return_true'
            ] 
        );

        // Get stocks by category (indices, gainers, losers, etc.)
        register_rest_route(
            'stock-tracker/v1', '/stocks/(?P<category>[a-zA-Z]+)', [ 
            'methods'             => 'GET',
            'callback'            => [ $this, 'get_stocks_by_category' ],
            'permission_callback' => '__return_true'
            ] 
        );

        // Update stock data (admin only)
        register_rest_route(
            'stock-tracker/v1', '/stocks/update', [ 
            'methods'             => 'POST',
            'callback'            => [ $this, 'update_stock' ],
            'permission_callback' => function () {
                return current_user_can('manage_options');
            }
            ] 
        );

        // Bulk update stocks (admin only)
        register_rest_route(
            'stock-tracker/v1', '/stocks/bulk-update', [ 
            'methods'             => 'POST',
            'callback'            => [ $this, 'bulk_update_stocks' ],
            'permission_callback' => function () {
                return current_user_can('manage_options');
            }
            ] 
        );
    }

    public function get_stocks()
    {
        global $wpdb;

        $results = $wpdb->get_results(
            "SELECT * FROM {$this->table_name} ORDER BY category, chg_percent DESC",
            ARRAY_A
        );

        return new WP_REST_Response($results, 200);
    }

    public function get_stocks_by_category( $request )
    {
        global $wpdb;

        $category = sanitize_text_field($request['category']);

        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$this->table_name} WHERE category = %s ORDER BY chg_percent DESC",
                $category
            ),
            ARRAY_A
        );

        return new WP_REST_Response($results, 200);
    }

    public function update_stock( $request )
    {
        global $wpdb;

        $params = $request->get_params();

        // Validate required fields
        $required_fields = [ 'id', 'ltp', 'chg', 'chg_percent', 'ad_ratio' ];
        foreach ( $required_fields as $field ) {
            if (! isset($params[ $field ]) ) {
                return new WP_Error(
                    'missing_field',
                    sprintf('Missing required field: %s', $field),
                    [ 'status' => 400 ]
                );
            }
        }

        $update_data = [ 
        'ltp'         => floatval($params['ltp']),
        'chg'         => floatval($params['chg']),
        'chg_percent' => floatval($params['chg_percent']),
        'ad_ratio'    => floatval($params['ad_ratio']),
        'updated_at'  => current_time('mysql')
        ];

        $result = $wpdb->update(
            $this->table_name,
            $update_data,
            [ 'id' => intval($params['id']) ]
        );

        if ($result === false ) {
            return new WP_Error(
                'update_failed',
                'Failed to update stock data',
                [ 'status' => 500 ]
            );
        }

        return new WP_REST_Response(
            [ 
            'success' => true,
            'message' => 'Stock updated successfully'
            ], 200 
        );
    }

    public function bulk_update_stocks( $request )
    {
        global $wpdb;

        $params = $request->get_params();

        if (! isset($params['stocks']) || ! is_array($params['stocks']) ) {
            return new WP_Error(
                'invalid_data',
                'Invalid or missing stocks data',
                [ 'status' => 400 ]
            );
        }

        $success_count = 0;
        $errors        = [];

        foreach ( $params['stocks'] as $stock ) {
            if (! isset($stock['id']) ) {
                continue;
            }

            $result = $wpdb->update(
                $this->table_name,
                [ 
                'ltp'         => floatval($stock['ltp']),
                'chg'         => floatval($stock['chg']),
                'chg_percent' => floatval($stock['chg_percent']),
                'ad_ratio'    => floatval($stock['ad_ratio']),
                'updated_at'  => current_time('mysql')
                ],
                [ 'id' => intval($stock['id']) ]
            );

            if ($result === false ) {
                $errors[] = "Failed to update stock ID: {$stock['id']}";
            } else {
                $success_count++;
            }
        }

        return new WP_REST_Response(
            [ 
            'success'       => true,
            'updated_count' => $success_count,
            'errors'        => $errors
            ], 200 
        );
    }
}

// Initialize the API
new Stock_Tracker_API();
