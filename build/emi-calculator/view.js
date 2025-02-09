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


// Calculate the EMI and related values
function calculateEMI(context) {
  const {
    calculations,
    ingredients
  } = context;

  // Ensure we have valid numbers
  const principalAmount = parseFloat(calculations.principalAmount) || 100000;
  const rateOfInterest = parseFloat(calculations.rateOfInterest) || 5;
  const DurationInYears = parseFloat(calculations.DurationInYears) || 1;

  // Calculate monthly rate
  const monthlyRate = rateOfInterest / (12 * 100);
  const totalMonths = DurationInYears * 12;
  try {
    // Calculate EMI
    const emiPerMonth = principalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Calculate other values
    const totalAmountPayable = emiPerMonth * totalMonths;
    const totalInterest = totalAmountPayable - principalAmount;

    // Update context with rounded values
    ingredients.emiPerMonth = Math.round(emiPerMonth * 100) / 100;
    ingredients.totalInterest = Math.round(totalInterest * 100) / 100;
    ingredients.totalAmountPayable = Math.round(totalAmountPayable * 100) / 100;
  } catch (error) {
    ingredients.emiPerMonth = 0;
    ingredients.totalInterest = 0;
    ingredients.totalAmountPayable = 0;
  }
}

// Define and store the block context
const emiCalculator = {
  actions: {
    principalAmount: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.calculations.principalAmount = parseFloat(event.target.value);
      calculateEMI(context);
    },
    rateOfInterest: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.calculations.rateOfInterest = parseFloat(event.target.value);
      calculateEMI(context);
    },
    DurationInYears: event => {
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      context.calculations.DurationInYears = parseFloat(event.target.value);
      calculateEMI(context);
    }
  }
};

// Store the context
(0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('create-block/emi-calculator', emiCalculator);
})();


//# sourceMappingURL=view.js.map