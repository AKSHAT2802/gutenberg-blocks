<?php
/**
 * Render callback for stock tracker block
 *
 * @package gb-blocks
 */

/**
 * Render stock tracker block
 *
 * @param  array    $attributes Block attributes.
 * @param  string   $content    Block content.
 * @param  WP_Block $block      Block instance.
 * @return string  Block HTML.
 */
function gb_blocks_render_stock_tracker( $attributes, $content, $block ) {
	wp_enqueue_script( 'gb-blocks-stock-tracker-view' );
	ob_start();
	?>
	<div <?php echo get_block_wrapper_attributes( array( 'class' => 'wp-block-stock-tracker' ) ); ?>>
		<div class="stock-tracker-root">
			<div class="stock-tabs">
				<button class="stock-tab active" data-tab="indices"><?php esc_html_e( 'Top Performing Indices', 'gb-blocks' ); ?></button>
				<button class="stock-tab" data-tab="gainers"><?php esc_html_e( 'Top Gainers', 'gb-blocks' ); ?></button>
				<button class="stock-tab" data-tab="losers"><?php esc_html_e( 'Top Losers', 'gb-blocks' ); ?></button>
				<button class="stock-tab" data-tab="high"><?php esc_html_e( '52 Week High', 'gb-blocks' ); ?></button>
				<button class="stock-tab" data-tab="low"><?php esc_html_e( '52 Week Low', 'gb-blocks' ); ?></button>
			</div>
			<div class="stock-content">
				<div class="stock-loading"><?php esc_html_e( 'Loading stocks data...', 'gb-blocks' ); ?></div>
				<div class="stock-table-container" style="display: none;">
					<table class="stock-table">
						<thead>
							<tr>
								<th><?php esc_html_e( 'Name', 'gb-blocks' ); ?></th>
								<th><?php esc_html_e( 'LTP', 'gb-blocks' ); ?></th>
								<th><?php esc_html_e( 'Chg', 'gb-blocks' ); ?></th>
								<th><?php esc_html_e( '%Chg', 'gb-blocks' ); ?></th>
								<th><?php esc_html_e( 'AdRatio', 'gb-blocks' ); ?></th>
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