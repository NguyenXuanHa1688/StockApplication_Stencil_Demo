import { B as BUILD, C as CSS, p as plt, w as win, a as promiseResolve, b as bootstrapLazy } from './index-11c739df.js';
export { s as setNonce } from './index-11c739df.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Esm v3.3.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // TODO(STENCIL-659): Remove code implementing the CSS variable shim
    // @ts-ignore
    if (BUILD.cssVarShim && !(CSS && CSS.supports && CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return import(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-640290a8.js').then(() => {
            if ((plt.$cssShim$ = win.__cssshim)) {
                // TODO(STENCIL-659): Remove code implementing the CSS variable shim
                return plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  globalScripts();
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["side-bar",[[1,"side-bar",{"title":[513],"opened":[1540],"showInfor":[32],"open":[64]}]]],["stock-finder",[[1,"stock-finder",{"searchResult":[32],"loading":[32],"error":[32],"stockInputValid":[32]}]]],["stock-price",[[1,"stock-price",{"stockSymbol":[1537,"stock-symbol"],"fetchPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","onStockSymbolSelected"]]]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map