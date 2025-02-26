/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

// Calculate the EMI and related values
function calculateEMI( context ) {
	const { calculations, amounts } = context;

	// Ensure we have valid numbers
	const principalAmount =
		parseFloat( calculations.principalAmount ) || 100000;
	const rateOfInterest = parseFloat( calculations.rateOfInterest ) || 5;
	const DurationInYears = parseFloat( calculations.DurationInYears ) || 1;

	// Calculate monthly rate
	const monthlyRate = rateOfInterest / ( 12 * 100 );
	const totalMonths = DurationInYears * 12;

	try {
		// Calculate EMI
		const emiPerMonth =
			( principalAmount *
				monthlyRate *
				Math.pow( 1 + monthlyRate, totalMonths ) ) /
			( Math.pow( 1 + monthlyRate, totalMonths ) - 1 );

		// Calculate other values
		const totalAmountPayable = emiPerMonth * totalMonths;
		const totalInterest = totalAmountPayable - principalAmount;

		// Update context with rounded values
		amounts.emiPerMonth = Math.round( emiPerMonth * 100 ) / 100;
		amounts.totalInterest = Math.round( totalInterest * 100 ) / 100;
		amounts.totalAmountPayable =
			Math.round( totalAmountPayable * 100 ) / 100;
	} catch ( error ) {
		amounts.emiPerMonth = 0;
		amounts.totalInterest = 0;
		amounts.totalAmountPayable = 0;
	}
}

// Define and store the block context
const emiCalculator = {
	actions: {
		principalAmount: ( event ) => {
			const context = getContext();
			context.calculations.principalAmount = parseFloat(
				event.target.value
			);
			calculateEMI( context );
		},
		rateOfInterest: ( event ) => {
			const context = getContext();
			context.calculations.rateOfInterest = parseFloat(
				event.target.value
			);
			calculateEMI( context );
		},
		DurationInYears: ( event ) => {
			const context = getContext();
			context.calculations.DurationInYears = parseFloat(
				event.target.value
			);
			calculateEMI( context );
		},
	},
};

// Store the context
store( 'create-block/emi-calculator', emiCalculator );
