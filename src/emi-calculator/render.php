<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * @package create-block
 */

?>
<div <?php echo esc_attr( get_block_wrapper_attributes() ); ?> data-wp-interactive="create-block/emi-calculator" data-wp-context='{
	"calculations": {
		"principalAmount": 100000,
		"rateOfInterest": 5,
		"DurationInYears": 0
	},
	"ingredients": {
		"emiPerMonth": 0,
		"totalInterest": 0,
		"totalAmountPayable": 0
	}
}'>
	<div class="panel">
		<p>Home Loan EMI Calculator</p>
		<div class="form-group">
			<label for="principalAmount">Principal Amount: <span id="principalAmountValue">100000</span></label>
			<br>
			<input type="range" id="principalAmount" min="100000" max="20000000" step="100000" value="100000"
				data-wp-on--input="actions.principalAmount">
		</div>

		<div class="form-group">
			<label for="rateOfInterest">Rate of Interest (%): <span id="rateOfInterestValue">5</span></label>
			<br>
			<input type="range" id="rateOfInterest" min="1" max="15" step="0.1" value="5"
				data-wp-on--input="actions.rateOfInterest">
		</div>

		<div class="form-group">
			<label for="durationInYears">Duration in Years: <span id="durationInYearsValue">1</span></label>
			<br>
			<input type="range" id="durationInYears" min="1" max="30" step="1" value="1"
				data-wp-on--input="actions.DurationInYears">
		</div>
	</div>

	<div class="panel">
		<div class="normal-group">
			<div class="ingredients">Monthly EMI :
				<span data-wp-text="context.ingredients.emiPerMonth"></span>
			</div>
		</div>

		<div class="normal-group">
			<div class="ingredients">Interest Amount :
				<span data-wp-text="context.ingredients.totalInterest"></span>
			</div>
		</div>

		<div class="primary-group">
			<div class="ingredients">Total Amount Payable :
				<span data-wp-text="context.ingredients.totalAmountPayable"></span>
			</div>
		</div>
	</div>
</div>

<script>
	document.addEventListener('DOMContentLoaded', () => {
		const sliders = document.querySelectorAll('input[type="range"]');

		sliders.forEach(slider => {
			const valueDisplay = document.getElementById(`${slider.id}Value`);

			// Update the display when the slider is moved
			slider.addEventListener('input', () => {
				valueDisplay.textContent = slider.value;
			});
		});
	});
</script>
