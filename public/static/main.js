/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "static/" + ({"components-Home":"components-Home","components-Login":"components-Login","components-Teste":"components-Teste","components-Nada":"components-Nada"}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["__LOADABLE_LOADED_CHUNKS__"] = window["__LOADABLE_LOADED_CHUNKS__"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/client/index.js","common","reactBuild"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @loadable/component */ \"./node_modules/@loadable/component/dist/loadable.es.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var components_route_LoadRoutes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/route/LoadRoutes */ \"./src/shared/components/route/LoadRoutes.js\");\n\n\n\n\n\nvar exec = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render;\n\nif (true) {\n  exec = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate;\n}\n\nObject(_loadable_component__WEBPACK_IMPORTED_MODULE_2__[\"loadableReady\"])(function () {\n  exec(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"BrowserRouter\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_route_LoadRoutes__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null)), document.getElementById('root'));\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2luZGV4LmpzPzNiNWUiXSwibmFtZXMiOlsiZXhlYyIsIlJlYWN0RE9NIiwicmVuZGVyIiwicHJvY2VzcyIsImh5ZHJhdGUiLCJsb2FkYWJsZVJlYWR5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQSxJQUFJQSxJQUFJLEdBQUdDLGdEQUFRLENBQUNDLE1BQXBCOztBQUVBLElBQUlDLElBQUosRUFBMkM7QUFDekNILE1BQUksR0FBR0MsZ0RBQVEsQ0FBQ0csT0FBaEI7QUFDRDs7QUFFREMseUVBQWEsQ0FBQyxZQUFNO0FBQ2xCTCxNQUFJLENBQ0YsMkRBQUMsOERBQUQsUUFDRSwyREFBQyxtRUFBRCxPQURGLENBREUsRUFJRk0sUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLENBSkUsQ0FBSjtBQU1ELENBUFksQ0FBYiIsImZpbGUiOiIuL3NyYy9jbGllbnQvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IHsgbG9hZGFibGVSZWFkeSB9IGZyb20gJ0Bsb2FkYWJsZS9jb21wb25lbnQnXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSdcblxuaW1wb3J0IExvYWRSb3V0ZXMgZnJvbSAnY29tcG9uZW50cy9yb3V0ZS9Mb2FkUm91dGVzJ1xuXG5sZXQgZXhlYyA9IFJlYWN0RE9NLnJlbmRlclxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBleGVjID0gUmVhY3RET00uaHlkcmF0ZVxufVxuXG5sb2FkYWJsZVJlYWR5KCgpID0+IHtcbiAgZXhlYyhcbiAgICA8QnJvd3NlclJvdXRlcj5cbiAgICAgIDxMb2FkUm91dGVzIC8+XG4gICAgPC9Ccm93c2VyUm91dGVyPixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4gIClcbn0pXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/client/index.js\n");

/***/ }),

/***/ "./src/shared/components/route/LoadRoutes.js":
/*!***************************************************!*\
  !*** ./src/shared/components/route/LoadRoutes.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @loadable/component */ \"./node_modules/@loadable/component/dist/loadable.es.js\");\n/* harmony import */ var components_route_PrivateRoute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! components/route/PrivateRoute */ \"./src/shared/components/route/PrivateRoute.js\");\n\n\n\n\nvar Home = Object(_loadable_component__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n  chunkName: function chunkName() {\n    return \"components-Home\";\n  },\n  isReady: function isReady(props) {\n    if (true) {\n      return !!__webpack_require__.m[this.resolve(props)];\n    }\n\n    return false;\n  },\n  requireAsync: function requireAsync() {\n    return Promise.all(/*! import() | components-Home */[__webpack_require__.e(\"common\"), __webpack_require__.e(\"components-Home\")]).then(__webpack_require__.bind(null, /*! components/Home */ \"./src/shared/components/Home.js\"));\n  },\n  requireSync: function requireSync(props) {\n    var id = this.resolve(props);\n\n    if (true) {\n      return __webpack_require__(id);\n    }\n\n    return eval('module.require')(id);\n  },\n  resolve: function resolve() {\n    if (true) {\n      return /*require.resolve*/(/*! components/Home */ \"./src/shared/components/Home.js\");\n    }\n\n    return eval('require.resolve')(\"components/Home\");\n  }\n});\nvar Login = Object(_loadable_component__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n  chunkName: function chunkName() {\n    return \"components-Login\";\n  },\n  isReady: function isReady(props) {\n    if (true) {\n      return !!__webpack_require__.m[this.resolve(props)];\n    }\n\n    return false;\n  },\n  requireAsync: function requireAsync() {\n    return __webpack_require__.e(/*! import() | components-Login */ \"components-Login\").then(__webpack_require__.bind(null, /*! components/Login */ \"./src/shared/components/Login.js\"));\n  },\n  requireSync: function requireSync(props) {\n    var id = this.resolve(props);\n\n    if (true) {\n      return __webpack_require__(id);\n    }\n\n    return eval('module.require')(id);\n  },\n  resolve: function resolve() {\n    if (true) {\n      return /*require.resolve*/(/*! components/Login */ \"./src/shared/components/Login.js\");\n    }\n\n    return eval('require.resolve')(\"components/Login\");\n  }\n});\nvar Teste = Object(_loadable_component__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n  chunkName: function chunkName() {\n    return \"components-Teste\";\n  },\n  isReady: function isReady(props) {\n    if (true) {\n      return !!__webpack_require__.m[this.resolve(props)];\n    }\n\n    return false;\n  },\n  requireAsync: function requireAsync() {\n    return __webpack_require__.e(/*! import() | components-Teste */ \"components-Teste\").then(__webpack_require__.bind(null, /*! components/Teste */ \"./src/shared/components/Teste.js\"));\n  },\n  requireSync: function requireSync(props) {\n    var id = this.resolve(props);\n\n    if (true) {\n      return __webpack_require__(id);\n    }\n\n    return eval('module.require')(id);\n  },\n  resolve: function resolve() {\n    if (true) {\n      return /*require.resolve*/(/*! components/Teste */ \"./src/shared/components/Teste.js\");\n    }\n\n    return eval('require.resolve')(\"components/Teste\");\n  }\n});\n\nvar LoadRoutes = function LoadRoutes() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    exact: true,\n    path: \"/\",\n    component: Home\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    exact: true,\n    path: \"/login\",\n    component: Login\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_route_PrivateRoute__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    exact: true,\n    path: \"/teste\",\n    component: Teste\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoadRoutes);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvcm91dGUvTG9hZFJvdXRlcy5qcz85Mzc5Il0sIm5hbWVzIjpbIkhvbWUiLCJsb2FkYWJsZSIsIkxvZ2luIiwiVGVzdGUiLCJMb2FkUm91dGVzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBLElBQU1BLElBQUksR0FBR0MsbUVBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsZ0JBQUM7QUFBQSxXQUFNLHdOQUFOO0FBQUEsR0FBRDtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUNBQUM7QUFBRDs7QUFBQTtBQUFBO0FBQUEsRUFBckI7QUFDQSxJQUFNQyxLQUFLLEdBQUdELG1FQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGdCQUFDO0FBQUEsV0FBTSw2S0FBTjtBQUFBLEdBQUQ7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUFDO0FBQUQ7O0FBQUE7QUFBQTtBQUFBLEVBQXRCO0FBQ0EsSUFBTUUsS0FBSyxHQUFHRixtRUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxnQkFBQztBQUFBLFdBQU0sNktBQU47QUFBQSxHQUFEO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FBQztBQUFEOztBQUFBO0FBQUE7QUFBQSxFQUF0Qjs7QUFFQSxJQUFNRyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFNO0FBQ3ZCLFNBQ0UsMkRBQUMsdURBQUQsUUFDRSwyREFBQyxzREFBRDtBQUFPLFNBQUssTUFBWjtBQUFhLFFBQUksRUFBQyxHQUFsQjtBQUFzQixhQUFTLEVBQUVKO0FBQWpDLElBREYsRUFFRSwyREFBQyxzREFBRDtBQUFPLFNBQUssTUFBWjtBQUFhLFFBQUksRUFBQyxRQUFsQjtBQUEyQixhQUFTLEVBQUVFO0FBQXRDLElBRkYsRUFHRSwyREFBQyxxRUFBRDtBQUFjLFNBQUssTUFBbkI7QUFBb0IsUUFBSSxFQUFDLFFBQXpCO0FBQWtDLGFBQVMsRUFBRUM7QUFBN0MsSUFIRixDQURGO0FBT0QsQ0FSRDs7QUFVZUMseUVBQWYiLCJmaWxlIjoiLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvcm91dGUvTG9hZFJvdXRlcy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFJvdXRlLCBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0IGxvYWRhYmxlIGZyb20gJ0Bsb2FkYWJsZS9jb21wb25lbnQnXG5cbmltcG9ydCBQcml2YXRlUm91dGUgZnJvbSAnY29tcG9uZW50cy9yb3V0ZS9Qcml2YXRlUm91dGUnXG5cbmNvbnN0IEhvbWUgPSBsb2FkYWJsZSgoKSA9PiBpbXBvcnQoJ2NvbXBvbmVudHMvSG9tZScpKVxuY29uc3QgTG9naW4gPSBsb2FkYWJsZSgoKSA9PiBpbXBvcnQoJ2NvbXBvbmVudHMvTG9naW4nKSlcbmNvbnN0IFRlc3RlID0gbG9hZGFibGUoKCkgPT4gaW1wb3J0KCdjb21wb25lbnRzL1Rlc3RlJykpXG5cbmNvbnN0IExvYWRSb3V0ZXMgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN3aXRjaD5cbiAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPScvJyBjb21wb25lbnQ9e0hvbWV9IC8+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD0nL2xvZ2luJyBjb21wb25lbnQ9e0xvZ2lufSAvPlxuICAgICAgPFByaXZhdGVSb3V0ZSBleGFjdCBwYXRoPScvdGVzdGUnIGNvbXBvbmVudD17VGVzdGV9IC8+XG4gICAgPC9Td2l0Y2g+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9hZFJvdXRlc1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/shared/components/route/LoadRoutes.js\n");

/***/ }),

/***/ "./src/shared/components/route/PrivateRoute.js":
/*!*****************************************************!*\
  !*** ./src/shared/components/route/PrivateRoute.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ \"./node_modules/@babel/runtime/helpers/objectWithoutProperties.js\");\n/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n\n\n\n\nvar isAuth = false;\n\nvar PrivateRoute = function PrivateRoute(_ref) {\n  var Component = _ref.component,\n      rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref, [\"component\"]);\n\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Route\"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {\n    render: function render(props) {\n      return isAuth === true ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, props) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Redirect\"], {\n        to: \"/login\"\n      });\n    }\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PrivateRoute);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvcm91dGUvUHJpdmF0ZVJvdXRlLmpzPzMwNWYiXSwibmFtZXMiOlsiaXNBdXRoIiwiUHJpdmF0ZVJvdXRlIiwiQ29tcG9uZW50IiwiY29tcG9uZW50IiwicmVzdCIsInByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLE1BQU0sR0FBRyxLQUFmOztBQUVBLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLE9BQXVDO0FBQUEsTUFBekJDLFNBQXlCLFFBQXBDQyxTQUFvQztBQUFBLE1BQVhDLElBQVc7O0FBQzFELFNBQ0UsMkRBQUMsc0RBQUQsNEVBQVdBLElBQVg7QUFBaUIsVUFBTSxFQUFFLGdCQUFDQyxLQUFEO0FBQUEsYUFDdkJMLE1BQU0sS0FBSyxJQUFYLEdBQWtCLDJEQUFDLFNBQUQsRUFBZUssS0FBZixDQUFsQixHQUE2QywyREFBQyx5REFBRDtBQUFVLFVBQUUsRUFBQztBQUFiLFFBRHRCO0FBQUE7QUFBekIsS0FERjtBQUtELENBTkQ7O0FBUWVKLDJFQUFmIiwiZmlsZSI6Ii4vc3JjL3NoYXJlZC9jb21wb25lbnRzL3JvdXRlL1ByaXZhdGVSb3V0ZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFJvdXRlLCBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5cbmNvbnN0IGlzQXV0aCA9IGZhbHNlXG5cbmNvbnN0IFByaXZhdGVSb3V0ZSA9ICh7IGNvbXBvbmVudDogQ29tcG9uZW50LCAuLi5yZXN0IH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Um91dGUgey4uLnJlc3R9IHJlbmRlcj17KHByb3BzKSA9PiAoXG4gICAgICBpc0F1dGggPT09IHRydWUgPyA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz4gOiA8UmVkaXJlY3QgdG89Jy9sb2dpbicgLz5cbiAgICApfSAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByaXZhdGVSb3V0ZVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/shared/components/route/PrivateRoute.js\n");

/***/ })

/******/ });