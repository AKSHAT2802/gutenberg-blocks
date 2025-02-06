/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

// Convert large amounts into metric if over a threshold
function convertToMetricIfNeeded( value, threshold )
{
    if (value > threshold ) {
        return {
            value: ( value / 100000 ).toFixed(2),
            unit: 'Lk',
        };
    }
    return {
        value: value.toFixed(2),
        unit: '',
    };
}

// Calculate the EMI and related values
function calculateEMI( context )
{
    if (! context.calculations ) {
        context.calculations = {
            principalAmount: 0,
            rateOfInterest: 0,
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

        // Convert and assign EMI
        const emi = convertToMetricIfNeeded(emiPerMonth, 100000, 'Lk');
        context.unitemiPerMonthLk = emi.unit;
        ingredients.emiPerMonth = emi.value;

        // Convert and assign total interest
        const interest = convertToMetricIfNeeded(totalInterest, 100000, 'Lk');
        context.unittotalInterestLk = interest.unit;
        ingredients.totalInterest = interest.value;

        // Convert and assign total amount payable
        const total = convertToMetricIfNeeded(
            totalAmountPayable,
            100000,
            'Lk'
        );
        context.unittotalAmountPayableLk = total.unit;
        ingredients.totalAmountPayable = total.value;
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
