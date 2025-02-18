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

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// require_once plugin_dir_path( __FILE__ ) . 'class-stock-tracker-api.php';
require_once plugin_dir_path( __FILE__ ) . './src/stock-display/render.php';


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 */
function emi_calculator_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build/emi-calculator' );
}
add_action( 'init', 'emi_calculator_block_init' );

/**
 * Registers the Carousel block.
 */
function carousel_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build/carousel-block' );
}
add_action( 'init', 'carousel_block_init' );

/**
 * Registers the Stock Tracker block.
 */
function stock_tracker_block_init() {
    // Register block
    register_block_type_from_metadata(
        __DIR__ . '/build/stock-display',
        array(
            'render_callback' => 'render_stock_tracker_block',
        )
    );

    // Register and localize script
    wp_register_script(
        'stock-tracker-view',
        plugins_url('build/stock-display/view.js', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/stock-display/view.js')
    );

    wp_localize_script(
        'stock-tracker-view',
        'stockTrackerData',
        array(
            'jsonUrl' => plugins_url('src/stock-display/data/stocks.json', __FILE__)
        )
    );
}
add_action('init', 'stock_tracker_block_init');

