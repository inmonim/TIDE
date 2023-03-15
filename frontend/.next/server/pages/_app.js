/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store */ \"./store/index.tsx\");\n\n\n\nfunction App({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\SSAFY\\\\Desktop\\\\S08P22E203\\\\frontend\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 6,\n        columnNumber: 10\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store__WEBPACK_IMPORTED_MODULE_2__.wrapper.withRedux(App));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE4QjtBQUVBO0FBRTlCLFNBQVNDLElBQUksRUFBQ0MsVUFBUyxFQUFFQyxVQUFTLEVBQVcsRUFBRTtJQUM3QyxxQkFBTyw4REFBQ0Q7UUFBVyxHQUFHQyxTQUFTOzs7Ozs7QUFDakM7QUFFQSxpRUFBZUgsb0RBQWlCLENBQUNDLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9wYWdlcy9fYXBwLnRzeD9mOWQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnQC9zdHlsZXMvZ2xvYmFscy5jc3MnO1xyXG5pbXBvcnQgdHlwZSB7QXBwUHJvcHN9IGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0IHt3cmFwcGVyfSBmcm9tICdzdG9yZSc7XHJcblxyXG5mdW5jdGlvbiBBcHAoe0NvbXBvbmVudCwgcGFnZVByb3BzfTogQXBwUHJvcHMpIHtcclxuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd3JhcHBlci53aXRoUmVkdXgoQXBwKTtcclxuIl0sIm5hbWVzIjpbIndyYXBwZXIiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJ3aXRoUmVkdXgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./store/features/countSlice.tsx":
/*!***************************************!*\
  !*** ./store/features/countSlice.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"countSlice\": () => (/* binding */ countSlice),\n/* harmony export */   \"decrement\": () => (/* binding */ decrement),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"fetchAsync\": () => (/* binding */ fetchAsync),\n/* harmony export */   \"increment\": () => (/* binding */ increment)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n\n// 초기값\nconst initialState = {\n    value: 0,\n    status: \"\"\n};\n// Thunk 예시\nconst fetchAsync = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)(\"count/fetchAsync\", async ()=>{\n    const resp = await fetch(\"https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits\");\n    const data = await resp.json();\n    return data.value;\n});\n// createSlice로 Slice생성\nconst countSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"count\",\n    initialState,\n    reducers: {\n        increment (state) {\n            state.value += 1;\n        },\n        decrement (state) {\n            state.value -= 1;\n        }\n    },\n    // 비동기 처리를 위한 redux-thunk사용 extraReducers\n    extraReducers: (builder)=>{\n        builder.addCase(fetchAsync.pending, (state)=>{\n            state.status = \"loading\";\n        }).addCase(fetchAsync.fulfilled, (state, action)=>{\n            state.status = \"completed\";\n            state.value = action.payload;\n        }).addCase(fetchAsync.rejected, (state)=>{\n            state.status = \"failed\";\n        });\n    }\n});\n// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기\nconst { increment , decrement  } = countSlice.actions;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countSlice.reducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9mZWF0dXJlcy9jb3VudFNsaWNlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQStEO0FBTy9ELE1BQU07QUFDTixNQUFNRSxlQUEyQjtJQUMvQkMsT0FBTztJQUNQQyxRQUFRO0FBQ1Y7QUFFQSxXQUFXO0FBQ0osTUFBTUMsYUFBYUwsa0VBQWdCQSxDQUN4QyxvQkFDQSxVQUFZO0lBQ1YsTUFBTU0sT0FBTyxNQUFNQyxNQUNqQjtJQUVGLE1BQU1DLE9BQU8sTUFBTUYsS0FBS0csSUFBSTtJQUM1QixPQUFPRCxLQUFLTCxLQUFLO0FBQ25CLEdBQ0E7QUFFRix1QkFBdUI7QUFDaEIsTUFBTU8sYUFBYVQsNkRBQVdBLENBQUM7SUFDcENVLE1BQU07SUFDTlQ7SUFDQVUsVUFBVTtRQUNSQyxXQUFVQyxLQUFLLEVBQUU7WUFDZkEsTUFBTVgsS0FBSyxJQUFJO1FBQ2pCO1FBQ0FZLFdBQVVELEtBQUssRUFBRTtZQUNmQSxNQUFNWCxLQUFLLElBQUk7UUFDakI7SUFDRjtJQUNBLHlDQUF5QztJQUN6Q2EsZUFBZUMsQ0FBQUEsVUFBVztRQUN4QkEsUUFDR0MsT0FBTyxDQUFDYixXQUFXYyxPQUFPLEVBQUVMLENBQUFBLFFBQVM7WUFDcENBLE1BQU1WLE1BQU0sR0FBRztRQUNqQixHQUNDYyxPQUFPLENBQUNiLFdBQVdlLFNBQVMsRUFBRSxDQUFDTixPQUFPTyxTQUFXO1lBQ2hEUCxNQUFNVixNQUFNLEdBQUc7WUFDZlUsTUFBTVgsS0FBSyxHQUFHa0IsT0FBT0MsT0FBTztRQUM5QixHQUNDSixPQUFPLENBQUNiLFdBQVdrQixRQUFRLEVBQUVULENBQUFBLFFBQVM7WUFDckNBLE1BQU1WLE1BQU0sR0FBRztRQUNqQjtJQUNKO0FBQ0YsR0FBRztBQUVILHFEQUFxRDtBQUM5QyxNQUFNLEVBQUNTLFVBQVMsRUFBRUUsVUFBUyxFQUFDLEdBQUdMLFdBQVdjLE9BQU8sQ0FBQztBQUN6RCxpRUFBZWQsV0FBV2UsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zdG9yZS9mZWF0dXJlcy9jb3VudFNsaWNlLnRzeD8zNDM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlQXN5bmNUaHVuaywgY3JlYXRlU2xpY2V9IGZyb20gJ0ByZWR1eGpzL3Rvb2xraXQnO1xyXG5cclxuLy8g7YOA7J6FXHJcbmludGVyZmFjZSBDb3VudFN0YXRlIHtcclxuICB2YWx1ZTogbnVtYmVyO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG59XHJcbi8vIOy0iOq4sOqwklxyXG5jb25zdCBpbml0aWFsU3RhdGU6IENvdW50U3RhdGUgPSB7XHJcbiAgdmFsdWU6IDAsXHJcbiAgc3RhdHVzOiAnJ1xyXG59O1xyXG5cclxuLy8gVGh1bmsg7JiI7IucXHJcbmV4cG9ydCBjb25zdCBmZXRjaEFzeW5jID0gY3JlYXRlQXN5bmNUaHVuayhcclxuICAnY291bnQvZmV0Y2hBc3luYycsXHJcbiAgYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAnaHR0cHM6Ly9hcGkuY291bnRhcGkueHl6L2hpdC9vcGVzYWxqa2Rmc2xramZzYWRmLmNvbS92aXNpdHMnXHJcbiAgICApO1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3AuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGEudmFsdWU7XHJcbiAgfVxyXG4pO1xyXG5cclxuLy8gY3JlYXRlU2xpY2XroZwgU2xpY2Xsg53shLFcclxuZXhwb3J0IGNvbnN0IGNvdW50U2xpY2UgPSBjcmVhdGVTbGljZSh7XHJcbiAgbmFtZTogJ2NvdW50JyxcclxuICBpbml0aWFsU3RhdGUsXHJcbiAgcmVkdWNlcnM6IHtcclxuICAgIGluY3JlbWVudChzdGF0ZSkge1xyXG4gICAgICBzdGF0ZS52YWx1ZSArPSAxO1xyXG4gICAgfSxcclxuICAgIGRlY3JlbWVudChzdGF0ZSkge1xyXG4gICAgICBzdGF0ZS52YWx1ZSAtPSAxO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8g67mE64+Z6riwIOyymOumrOulvCDsnITtlZwgcmVkdXgtdGh1bmvsgqzsmqkgZXh0cmFSZWR1Y2Vyc1xyXG4gIGV4dHJhUmVkdWNlcnM6IGJ1aWxkZXIgPT4ge1xyXG4gICAgYnVpbGRlclxyXG4gICAgICAuYWRkQ2FzZShmZXRjaEFzeW5jLnBlbmRpbmcsIHN0YXRlID0+IHtcclxuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnbG9hZGluZyc7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRDYXNlKGZldGNoQXN5bmMuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgIHN0YXRlLnN0YXR1cyA9ICdjb21wbGV0ZWQnO1xyXG4gICAgICAgIHN0YXRlLnZhbHVlID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRDYXNlKGZldGNoQXN5bmMucmVqZWN0ZWQsIHN0YXRlID0+IHtcclxuICAgICAgICBzdGF0ZS5zdGF0dXMgPSAnZmFpbGVkJztcclxuICAgICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIGNyZWF0ZVNsaWNl7J2YIHJlZHVjZXJzIOyXkOyEnCDrp4zrk6Agc3RhdGUg67OA6rK9IO2VqOyImOulvCBleHBvcnQg7ZWY6riwXHJcbmV4cG9ydCBjb25zdCB7aW5jcmVtZW50LCBkZWNyZW1lbnR9ID0gY291bnRTbGljZS5hY3Rpb25zO1xyXG5leHBvcnQgZGVmYXVsdCBjb3VudFNsaWNlLnJlZHVjZXI7XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVBc3luY1RodW5rIiwiY3JlYXRlU2xpY2UiLCJpbml0aWFsU3RhdGUiLCJ2YWx1ZSIsInN0YXR1cyIsImZldGNoQXN5bmMiLCJyZXNwIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsImNvdW50U2xpY2UiLCJuYW1lIiwicmVkdWNlcnMiLCJpbmNyZW1lbnQiLCJzdGF0ZSIsImRlY3JlbWVudCIsImV4dHJhUmVkdWNlcnMiLCJidWlsZGVyIiwiYWRkQ2FzZSIsInBlbmRpbmciLCJmdWxmaWxsZWQiLCJhY3Rpb24iLCJwYXlsb2FkIiwicmVqZWN0ZWQiLCJhY3Rpb25zIiwicmVkdWNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/features/countSlice.tsx\n");

/***/ }),

/***/ "./store/index.tsx":
/*!*************************!*\
  !*** ./store/index.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useAppDispatch\": () => (/* binding */ useAppDispatch),\n/* harmony export */   \"useAppSelector\": () => (/* binding */ useAppSelector),\n/* harmony export */   \"wrapper\": () => (/* binding */ wrapper)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-redux-wrapper */ \"next-redux-wrapper\");\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducer */ \"./store/reducer.tsx\");\n// 전체적으로 next-redux-wrapper 공식문서참고함\n\n\n\n\nconst makeStore = ()=>(0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.configureStore)({\n        reducer: _reducer__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n        devTools: true\n    });\n/** useDispatch는 thunkAction에 대해서 타입에러를 발생시키므로 커스터 마이징해서 사용합니다. */ const useAppDispatch = ()=>(0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n/** useSelector를 사용할 경우, 매번 state의 타입을 지정해줘야 하기 때문에 커스터 마이징해서 사용합니다. */ const useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector;\n// 공식문서 참고함\nconst wrapper = (0,next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__.createWrapper)(makeStore);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNvQztBQUNwQjtBQUMwQjtBQUN6QztBQUVwQyxNQUFNSyxZQUFZLElBQ2hCTCxnRUFBY0EsQ0FBQztRQUNiTSxTQUFTRixnREFBV0E7UUFDcEJHLFVBQVUsSUFBSTtJQUNoQjtBQWFGLGdFQUFnRSxHQUN6RCxNQUFNQyxpQkFBaUIsSUFBTU4sd0RBQVdBLEdBQWdCO0FBQy9ELHFFQUFxRSxHQUM5RCxNQUFNTyxpQkFBa0ROLG9EQUFXQSxDQUFDO0FBQzNFLFdBQVc7QUFDSixNQUFNTyxVQUFVVCxpRUFBYUEsQ0FBV0ksV0FBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3RvcmUvaW5kZXgudHN4P2UyZTciXSwic291cmNlc0NvbnRlbnQiOlsiLy8g7KCE7LK07KCB7Jy866GcIG5leHQtcmVkdXgtd3JhcHBlciDqs7Xsi53rrLjshJzssLjqs6DtlahcclxuaW1wb3J0IHsgY29uZmlndXJlU3RvcmUsIFRodW5rQWN0aW9uLCBBY3Rpb24gfSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVXcmFwcGVyIH0gZnJvbSBcIm5leHQtcmVkdXgtd3JhcHBlclwiO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IsIFR5cGVkVXNlU2VsZWN0b3JIb29rIH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCByb290UmVkdWNlciBmcm9tIFwiLi9yZWR1Y2VyXCI7XHJcblxyXG5jb25zdCBtYWtlU3RvcmUgPSAoKSA9PlxyXG4gIGNvbmZpZ3VyZVN0b3JlKHtcclxuICAgIHJlZHVjZXI6IHJvb3RSZWR1Y2VyLFxyXG4gICAgZGV2VG9vbHM6IHRydWUsXHJcbiAgfSk7XHJcblxyXG5leHBvcnQgdHlwZSBBcHBTdG9yZSA9IFJldHVyblR5cGU8dHlwZW9mIG1ha2VTdG9yZT47XHJcbmV4cG9ydCB0eXBlIEFwcFN0YXRlID0gUmV0dXJuVHlwZTxBcHBTdG9yZVtcImdldFN0YXRlXCJdPjtcclxuZXhwb3J0IHR5cGUgQXBwRGlzcGF0Y2ggPSBBcHBTdG9yZVtcImRpc3BhdGNoXCJdO1xyXG5leHBvcnQgdHlwZSBBcHBUaHVuazxSZXR1cm5UeXBlID0gdm9pZD4gPSBUaHVua0FjdGlvbjxcclxuICBSZXR1cm5UeXBlLFxyXG4gIEFwcFN0YXRlLFxyXG4gIHVua25vd24sXHJcbiAgQWN0aW9uXHJcbj47XHJcbmV4cG9ydCB0eXBlIFJvb3RTdGF0ZSA9IFJldHVyblR5cGU8QXBwU3RvcmVbXCJnZXRTdGF0ZVwiXT47XHJcblxyXG4vKiogdXNlRGlzcGF0Y2jripQgdGh1bmtBY3Rpb27sl5Ag64yA7ZW07IScIO2DgOyeheyXkOufrOulvCDrsJzsg53si5ztgqTrr4DroZwg7Luk7Iqk7YSwIOuniOydtOynle2VtOyEnCDsgqzsmqntlanri4jri6QuICovXHJcbmV4cG9ydCBjb25zdCB1c2VBcHBEaXNwYXRjaCA9ICgpID0+IHVzZURpc3BhdGNoPEFwcERpc3BhdGNoPigpO1xyXG4vKiogdXNlU2VsZWN0b3Lrpbwg7IKs7Jqp7ZWgIOqyveyasCwg66ek67KIIHN0YXRl7J2YIO2DgOyeheydhCDsp4DsoJXtlbTspJjslbwg7ZWY6riwIOuVjOusuOyXkCDsu6TsiqTthLAg66eI7J207KeV7ZW07IScIOyCrOyaqe2VqeuLiOuLpC4gKi9cclxuZXhwb3J0IGNvbnN0IHVzZUFwcFNlbGVjdG9yOiBUeXBlZFVzZVNlbGVjdG9ySG9vazxSb290U3RhdGU+ID0gdXNlU2VsZWN0b3I7XHJcbi8vIOqzteyLneusuOyEnCDssLjqs6DtlahcclxuZXhwb3J0IGNvbnN0IHdyYXBwZXIgPSBjcmVhdGVXcmFwcGVyPEFwcFN0b3JlPihtYWtlU3RvcmUpO1xyXG4iXSwibmFtZXMiOlsiY29uZmlndXJlU3RvcmUiLCJjcmVhdGVXcmFwcGVyIiwidXNlRGlzcGF0Y2giLCJ1c2VTZWxlY3RvciIsInJvb3RSZWR1Y2VyIiwibWFrZVN0b3JlIiwicmVkdWNlciIsImRldlRvb2xzIiwidXNlQXBwRGlzcGF0Y2giLCJ1c2VBcHBTZWxlY3RvciIsIndyYXBwZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./store/index.tsx\n");

/***/ }),

/***/ "./store/reducer.tsx":
/*!***************************!*\
  !*** ./store/reducer.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-redux-wrapper */ \"next-redux-wrapper\");\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _features_countSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./features/countSlice */ \"./store/features/countSlice.tsx\");\n\n\n\n// 리듀서들을 합쳐주는곳\nconst combinedReducer = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({\n    counter: _features_countSlice__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n});\n// Hydrate와 위에서 합친 reducer들을 rootReducer에 세팅\nconst rootReducer = (state, action)=>{\n    // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.\n    if (action.type === next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__.HYDRATE) {\n        return {\n            ...state,\n            ...action.payload\n        };\n    }\n    return combinedReducer(state, action);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootReducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9yZWR1Y2VyLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBaUQ7QUFDTjtBQUNJO0FBRS9DLGNBQWM7QUFDZCxNQUFNRyxrQkFBa0JILGlFQUFlQSxDQUFDO0lBQ3RDSSxTQUFTRiw0REFBVUE7QUFDckI7QUFFQSw0Q0FBNEM7QUFDNUMsTUFBTUcsY0FBc0MsQ0FBQ0MsT0FBT0MsU0FBVztJQUM3RCxtQ0FBbUM7SUFDbkMsSUFBSUEsT0FBT0MsSUFBSSxLQUFLUCx1REFBT0EsRUFBRTtRQUMzQixPQUFPO1lBQ0wsR0FBR0ssS0FBSztZQUNSLEdBQUdDLE9BQU9FLE9BQU87UUFDbkI7SUFDRixDQUFDO0lBQ0QsT0FBT04sZ0JBQWdCRyxPQUFPQztBQUNoQztBQUVBLGlFQUFlRixXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zdG9yZS9yZWR1Y2VyLnRzeD85OWYxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdAcmVkdXhqcy90b29sa2l0JztcclxuaW1wb3J0IHtIWURSQVRFfSBmcm9tICduZXh0LXJlZHV4LXdyYXBwZXInO1xyXG5pbXBvcnQgY291bnRTbGljZSBmcm9tICcuL2ZlYXR1cmVzL2NvdW50U2xpY2UnO1xyXG5cclxuLy8g66as65OA7ISc65Ok7J2EIO2VqeyzkOyjvOuKlOqzs1xyXG5jb25zdCBjb21iaW5lZFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xyXG4gIGNvdW50ZXI6IGNvdW50U2xpY2VcclxufSk7XHJcblxyXG4vLyBIeWRyYXRl7JmAIOychOyXkOyEnCDtlansuZwgcmVkdWNlcuuTpOydhCByb290UmVkdWNlcuyXkCDshLjtjIVcclxuY29uc3Qgcm9vdFJlZHVjZXI6IHR5cGVvZiBjb21iaW5lZFJlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gIC8vIOyEnOuyhCDsgqzsnbTrk5wg642w7J207YSw66W8IO2BtOudvOydtOyWuO2KuCDsgqzsnbTrk5wgU3RvcmXsl5Ag7Ya17ZWpLlxyXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gSFlEUkFURSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uc3RhdGUsXHJcbiAgICAgIC4uLmFjdGlvbi5wYXlsb2FkXHJcbiAgICB9O1xyXG4gIH1cclxuICByZXR1cm4gY29tYmluZWRSZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXI7XHJcbiJdLCJuYW1lcyI6WyJjb21iaW5lUmVkdWNlcnMiLCJIWURSQVRFIiwiY291bnRTbGljZSIsImNvbWJpbmVkUmVkdWNlciIsImNvdW50ZXIiLCJyb290UmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInBheWxvYWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./store/reducer.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();