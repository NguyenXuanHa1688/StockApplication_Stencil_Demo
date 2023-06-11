'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-92894fbe.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Esm v3.3.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // TODO(STENCIL-659): Remove code implementing the CSS variable shim
    // @ts-ignore
    if (index.BUILD.cssVarShim && !(index.CSS && index.CSS.supports && index.CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return Promise.resolve().then(function () { return require(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-c37ba663.js'); }).then(() => {
            if ((index.plt.$cssShim$ = index.win.__cssshim)) {
                // TODO(STENCIL-659): Remove code implementing the CSS variable shim
                return index.plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  appGlobals.globalScripts();
  return index.bootstrapLazy([["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["side-bar.cjs",[[1,"side-bar",{"title":[513],"opened":[1540],"showInfor":[32],"open":[64]}]]],["stock-finder.cjs",[[1,"stock-finder",{"searchResult":[32],"loading":[32],"error":[32],"stockInputValid":[32]}]]],["stock-price.cjs",[[1,"stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map