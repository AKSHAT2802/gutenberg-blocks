/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

// Calculate the EMI and related values
function calculateEMI( context )
{
    if (! context.calculations ) {
        context.calculations = {
            principalAmount: 100000,
            rateOfInterest: 5,
            DurationInYears: 0,
        };
    }

    if (! context.ingredients ) {
        context.ingredients = {
            emiPerMonth: 0,
            totalInterest: 0,
            totalAmountPayable: 0,
        };
    }

    const { calculations, ingredients } = context;
    const { principalAmount, rateOfInterest, DurationInYears } = calculations;

    if (principalAmount > 0 && rateOfInterest > 0 && DurationInYears > 0 ) {
        const monthlyRate = rateOfInterest / ( 12 * 100 );
        const totalMonths = DurationInYears * 12;

        const emiPerMonth =
        ( principalAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, totalMonths) ) /
        ( Math.pow(1 + monthlyRate, totalMonths) - 1 );

        const totalAmountPayable = emiPerMonth * totalMonths;
        const totalInterest = totalAmountPayable - principalAmount;

		// round off the EMI to 2 decimal places
        ingredients.emiPerMonth = Math.round(emiPerMonth * 100) / 100;

		// round off the total interest to 2 decimal places
        ingredients.totalInterest = Math.round(totalInterest * 100) / 100;

        // round off the total amount payable to 2 decimal places
        ingredients.totalAmountPayable = Math.round(totalAmountPayable * 100) / 100;
    } else {
        ingredients.emiPerMonth = 0;
        ingredients.totalInterest = 0;
        ingredients.totalAmountPayable = 0;
    }
}

// Define and store the block context
store(
    'create-block/emi-calculator', {
        actions: {
            principalAmount: ( event ) => {
                const context = getContext();
                if (! context.calculations ) {
                     context.calculations = {};
                }
                context.calculations.principalAmount =
                parseFloat(event.target.value) || 0;
                calculateEMI(context);
            },
            rateOfInterest: ( event ) => {
                const context = getContext();
                if (! context.calculations ) {
                     context.calculations = {};
                }
                context.calculations.rateOfInterest =
                parseFloat(event.target.value) || 0;
                calculateEMI(context);
            },
            DurationInYears: ( event ) => {
                const context = getContext();
                if (! context.calculations ) {
                     context.calculations = {};
                }
                context.calculations.DurationInYears =
                parseFloat(event.target.value) || 0;
                calculateEMI(context);
            },
        },
    } 
);
