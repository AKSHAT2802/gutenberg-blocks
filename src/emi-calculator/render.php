<?php
/**
 * PHP file to use when rendering the EMI calculator block on the server to show on the front end.
 *
 * @package gb-blocks
 */

?>
<div <?php echo wp_kses_post( get_block_wrapper_attributes() ); ?> data-wp-interactive="create-block/emi-calculator" data-wp-context='{
	"calculations": {
		"principalAmount": 100000,
		"rateOfInterest": 5,
		"DurationInYears": 0
	},
	"amounts": {
		"emiPerMonth": 0,
		"totalInterest": 0,
		"totalAmountPayable": 0
	}
}'>
	<div class="panel">
		<p><?php esc_html_e( 'Home Loan EMI Calculator', 'gb-blocks' ); ?></p>
		<div class="form-group">
			<label for="principalAmount"><?php esc_html_e( 'Principal Amount:', 'gb-blocks' ); ?> <span id="principalAmountValue">100000</span></label>
			<br>
			<input type="range" id="principalAmount" min="100000" max="20000000" step="100000" value="100000"
				data-wp-on--input="actions.principalAmount">
		</div>

		<div class="form-group">
			<label for="rateOfInterest"><?php esc_html_e( 'Rate of Interest (%):', 'gb-blocks' ); ?> <span id="rateOfInterestValue">5</span></label>
			<br>
			<input type="range" id="rateOfInterest" min="1" max="15" step="0.1" value="5"
				data-wp-on--input="actions.rateOfInterest">
		</div>

		<div class="form-group">
			<label for="durationInYears"><?php esc_html_e( 'Duration in Years:', 'gb-blocks' ); ?> <span id="durationInYearsValue">1</span></label>
			<br>
			<input type="range" id="durationInYears" min="1" max="30" step="1" value="1"
				data-wp-on--input="actions.DurationInYears">
		</div>
	</div>

	<div class="panel">
		<div class="normal-group">
			<div class="amounts"><?php esc_html_e( 'Monthly EMI:', 'gb-blocks' ); ?>
				<span data-wp-text="context.amounts.emiPerMonth"></span>
			</div>
		</div>

		<div class="normal-group">
			<div class="amounts"><?php esc_html_e( 'Interest Amount:', 'gb-blocks' ); ?>
				<span data-wp-text="context.amounts.totalInterest"></span>
			</div>
		</div>

		<div class="primary-group">
			<div class="amounts"><?php esc_html_e( 'Total Amount Payable:', 'gb-blocks' ); ?>
				<span data-wp-text="context.amounts.totalAmountPayable"></span>
			</div>
		</div>
	</div>
</div>
