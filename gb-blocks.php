<?php
/**
 * Plugin Name:       GB Blocks
 * Description:       An interactive block with the Interactivity API
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gb-blocks
 *
 * @package create-block
 */

if (! defined('ABSPATH') ) {
    exit; // Exit if accessed directly.
}

require_once plugin_dir_path(__FILE__) . 'stock-api.php';


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function emi_calculator_block_init()
{
    register_block_type_from_metadata(__DIR__ . '/build/emi-calculator');
}
add_action('init', 'emi_calculator_block_init');

/**
 * Registers the Carousel block.
 */
function carousel_block_init()
{
    register_block_type_from_metadata(__DIR__ . '/build/carousel-block');
}
add_action('init', 'carousel_block_init');

/**
 * Registers the Stock Tracker block.
 */
function stock_tracker_block_init()
{
    // Register block
    register_block_type_from_metadata(
        __DIR__ . '/build/stock-display', array(
        'render_callback' => 'render_stock_tracker_block'
        ) 
    );

    // Register scripts and styles
    wp_register_script(
        'stock-tracker-view',
        plugins_url('build/stock-display/view.js', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/stock-display/view.js')
    );

    // Localize script with necessary data
    wp_localize_script(
        'stock-tracker-view', 'stockTrackerData', array(
        'apiUrl' => rest_url('stock-tracker/v1/stocks'),
        'nonce'  => wp_create_nonce('wp_rest')
        ) 
    );
}
add_action('init', 'stock_tracker_block_init');
/**
 * render_stock_tracker_block
 *
 * @param  mixed $attributes
 * @param  mixed $content
 * @param  mixed $block
 * @return void
 */
function render_stock_tracker_block( $attributes, $content, $block )
{
    // Enqueue frontend assets
    wp_enqueue_script('stock-tracker-view');
    wp_enqueue_style('stock-tracker-style');

    ob_start();
    ?>
    <div class="wp-block-stock-tracker">
        <div class="stock-tracker-root">
            <div class="stock-tabs">
                <button class="stock-tab active" data-tab="indices">Top Performing Indices</button>
                <button class="stock-tab" data-tab="gainers">Top Gainers</button>
                <button class="stock-tab" data-tab="losers">Top Loser</button>
                <button class="stock-tab" data-tab="high">52 Week High</button>
                <button class="stock-tab" data-tab="low">52 Week Low</button>
            </div>
            <div class="stock-content">
                <div class="stock-loading">Loading stocks data...</div>
                <div class="stock-table-container" style="display: none;">
                    <table class="stock-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>LTP</th>
                                <th>Chg</th>
                                <th>%Chg</th>
                                <th>AdRatio</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
