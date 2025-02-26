<?php
/**
 * Plugin Name:       GB Blocks
 * Description:       A collection of interactive Gutenberg blocks
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gb-blocks
 *
 * @package gb-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Include render callbacks.
require_once plugin_dir_path( __FILE__ ) . './src/stock-display/render.php';

/**
 * Registers all blocks included in the plugin.
 */
function gb_blocks_register_blocks() {
	// Register EMI Calculator block.
	register_block_type_from_metadata( __DIR__ . '/build/emi-calculator' );

	// Register Carousel block.
	register_block_type_from_metadata( __DIR__ . '/build/carousel-block' );

	// Register Stock Tracker block with render callback.
	register_block_type_from_metadata(
		__DIR__ . '/build/stock-display',
		array(
			'render_callback' => 'gb_blocks_render_stock_tracker',
		)
	);

	// Register the view script for the stock tracker
	wp_register_script(
		'gb-blocks-stock-tracker-view',
		plugins_url( 'build/stock-display/view.js', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/stock-display/view.js' ),
		true
	);

	$json_file_path = plugin_dir_path( __FILE__ ) . 'src/stock-display/data/stocks.json';
	$json_version = file_exists( $json_file_path ) ? filemtime( $json_file_path ) : '1.0.0';

	// Localize stock tracker data with version parameter to prevent caching
	wp_localize_script(
		'gb-blocks-stock-tracker-view',
		'gbBlocksStockTrackerData',
		array(
			'jsonUrl' => plugins_url( 'src/stock-display/data/stocks.json', __FILE__ ) . '?ver=' . $json_version,
		)
	);
}
add_action( 'init', 'gb_blocks_register_blocks' );
