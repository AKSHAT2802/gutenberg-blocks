import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/emi-calculator/view.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");
/**
 * WordPress dependencies
 */


// Convert large amounts into metric if over a threshold
function convertToMetricIfNeeded(value, threshold, unit) {
  if (value > threshold) {
    return {
      value: (value / 100000).toFixed(2),
      unit: 'Lk'
    };
  } else {
    return {
      value: value.toFixed(2),
      unit: ''
    };
  }
}

// Calculate the EMI and related values
function calculateEMI(context) {
  if (!context.calculations) {
    context.calculations = {
      principalAmount: 0,
      rateOfInterest: 0,
      DurationInYears: 0
    };
  }
  if (!context.ingredients) {
    context.ingredients = {
      emiPerMonth: 0,
      totalInterest: 0,
      totalAmountPayable: 0
    };
  }
  const {
    calculations,
    ingredients
  } = context;
  const {
    principalAmount,
    rateOfInterest,
    DurationInYears
  } = calculations;
  if (principalAmount > 0 && rateOfInterest > 0 && DurationInYears > 0) {
    const monthlyRate = rateOfInterest / (12 * 100);
    const totalMonths = DurationInYears * 12;
    const emiPerMonth = principalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
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
    const total = convertToMetricIfNeeded(totalAmountPayable, 100000, 'Lk');
    context.unittotalAmountPayableLk = total.unit;
    ingredients.totalAmountPayable = total.value;
  } else {
    ingredients.emiPerMonth = 0;
    ingredients.totalInterest = 0;
    ingredients.totalAmountPayable = 0;
  }
}

// Define and store the block context
(0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('create-block/emi-calculator', {
  actions: {
    principalAmount: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (!context.calculations) {
        context.calculations = {};
      }
      context.calculations.principalAmount = parseFloat(event.target.value) || 0;
      console.log('Updated principalAmount:', context.calculations.principalAmount);
      calculateEMI(context);
    },
    rateOfInterest: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (!context.calculations) {
        context.calculations = {};
      }
      context.calculations.rateOfInterest = parseFloat(event.target.value) || 0;
      console.log('Updated rateOfInterest:', context.calculations.rateOfInterest);
      calculateEMI(context);
    },
    DurationInYears: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      if (!context.calculations) {
        context.calculations = {};
      }
      context.calculations.DurationInYears = parseFloat(event.target.value) || 0;
      console.log('Updated DurationInYears:', context.calculations.DurationInYears);
      calculateEMI(context);
    }
  }
});
})();


//# sourceMappingURL=view.js.map