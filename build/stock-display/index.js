/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/stock-display/edit.js":
/*!***********************************!*\
  !*** ./src/stock-display/edit.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_stocks_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/stocks.json */ "./src/stock-display/data/stocks.json");




function Edit() {
  const [stocks, setStocks] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('indices');
  const fetchStocks = async category => {
    setLoading(true);
    try {
      // Using imported JSON data directly
      setStocks(_data_stocks_json__WEBPACK_IMPORTED_MODULE_3__[category] || []);
    } catch (error) {
      console.error('Error loading stocks:', error);
    } finally {
      setLoading(false);
    }
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchStocks(activeTab);
  }, [activeTab]);

  // Your existing tabs array
  const tabs = [{
    name: 'indices',
    title: 'Top Performing Indices',
    className: 'tab-indices'
  }, {
    name: 'gainers',
    title: 'Top Gainers',
    className: 'tab-gainers'
  }, {
    name: 'losers',
    title: 'Top Loser',
    className: 'tab-losers'
  }, {
    name: 'high',
    title: '52 Week High',
    className: 'tab-high'
  }, {
    name: 'low',
    title: '52 Week Low',
    className: 'tab-low'
  }];
  const renderStockTable = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "stock-table-container"
  }, loading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading-spinner"
  }, "Loading...") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "stock-table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Name"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "LTP"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "Chg"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "%Chg"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "AdRatio"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, stocks.map(stock => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: stock.id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "stock-name"
  }, stock.name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "stock-ltp"
  }, stock.ltp), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: `stock-chg ${stock.chg >= 0 ? 'positive' : 'negative'}`
  }, stock.chg >= 0 ? '+' : '', stock.chg), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: `stock-percent ${stock.chg_percent >= 0 ? 'positive' : 'negative'}`
  }, stock.chg_percent >= 0 ? '+' : '', stock.chg_percent, "%"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "stock-ratio"
  }, stock.ad_ratio))))));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "stock-tracker-block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
    className: "stock-tracker-tabs",
    activeClass: "active-tab",
    tabs: tabs,
    onSelect: tabName => {
      setActiveTab(tabName);
    }
  }, tab => renderStockTable()));
}

/***/ }),

/***/ "./src/stock-display/index.js":
/*!************************************!*\
  !*** ./src/stock-display/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/stock-display/style.css");
/* harmony import */ var _editor_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.css */ "./src/stock-display/editor.css");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/stock-display/edit.js");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.registerBlockType)('create-block/stock-display', {
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/stock-display/editor.css":
/*!**************************************!*\
  !*** ./src/stock-display/editor.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/stock-display/style.css":
/*!*************************************!*\
  !*** ./src/stock-display/style.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "./src/stock-display/data/stocks.json":
/*!********************************************!*\
  !*** ./src/stock-display/data/stocks.json ***!
  \********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"indices":[{"id":1,"name":"Nifty 50","ltp":11112.15,"chg":-26.25,"chg_percent":-0.11,"ad_ratio":0.67},{"id":2,"name":"Nifty Bank","ltp":49506.95,"chg":-80.25,"chg_percent":-0.16,"ad_ratio":0.71}],"gainers":[{"id":3,"name":"Reliance","ltp":2456.75,"chg":45.25,"chg_percent":1.87,"ad_ratio":1.23}],"losers":[{"id":4,"name":"TCS","ltp":3456.75,"chg":-45.25,"chg_percent":-1.87,"ad_ratio":0.83}],"high":[{"id":5,"name":"HDFC Bank","ltp":1676.75,"chg":25.25,"chg_percent":0.87,"ad_ratio":1.13},{"id":7,"name":"ICICI Bank","ltp":1666.75,"chg":15.25,"chg_percent":0.87,"ad_ratio":0.93},{"id":8,"name":"Coal India","ltp":566.75,"chg":8.25,"chg_percent":1.87,"ad_ratio":0.93}],"low":[{"id":6,"name":"Infosys","ltp":1356.75,"chg":-15.25,"chg_percent":-0.87,"ad_ratio":0.93},{"id":9,"name":"HUL","ltp":2366.75,"chg":-18.25,"chg_percent":-0.87,"ad_ratio":0.93},{"id":10,"name":"Bajaj Finance","ltp":3566.75,"chg":-25.25,"chg_percent":-0.87,"ad_ratio":0.93}]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"stock-display/index": 0,
/******/ 			"stock-display/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkgb_blocks"] = globalThis["webpackChunkgb_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["stock-display/style-index"], () => (__webpack_require__("./src/stock-display/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map