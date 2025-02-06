<?php
/**
 * render_stock_tracker_block
 *
 * @param  mixed $attributes
 * @param  mixed $content
 * @param  mixed $block
 * @return void
 */
/**
 * Render stock tracker block
 *
 * @param  array    $attributes Block attributes.
 * @param  string   $content    Block content.
 * @param  WP_Block $block      Block instance.
 * @return string  Block HTML.
 */
function render_stock_tracker_block( $attributes, $content, $block )
{
    // Enqueue frontend assets
    wp_enqueue_script('stock-tracker-view');
    wp_enqueue_style('stock-tracker-style');

    ob_start();
    ?>
    <div <?php echo get_block_wrapper_attributes(array( 'class' => 'wp-block-stock-tracker' )); ?>>
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
