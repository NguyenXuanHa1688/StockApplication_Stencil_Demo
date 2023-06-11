/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface SideBar {
        "open": () => void;
        "opened": boolean;
        "title": string;
    }
    interface StockFinder {
    }
    interface StockPrice {
        "stockSymbol": string;
    }
}
export interface StockFinderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLStockFinderElement;
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLSideBarElement extends Components.SideBar, HTMLStencilElement {
    }
    var HTMLSideBarElement: {
        prototype: HTMLSideBarElement;
        new (): HTMLSideBarElement;
    };
    interface HTMLStockFinderElement extends Components.StockFinder, HTMLStencilElement {
    }
    var HTMLStockFinderElement: {
        prototype: HTMLStockFinderElement;
        new (): HTMLStockFinderElement;
    };
    interface HTMLStockPriceElement extends Components.StockPrice, HTMLStencilElement {
    }
    var HTMLStockPriceElement: {
        prototype: HTMLStockPriceElement;
        new (): HTMLStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "side-bar": HTMLSideBarElement;
        "stock-finder": HTMLStockFinderElement;
        "stock-price": HTMLStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface SideBar {
        "opened"?: boolean;
        "title"?: string;
    }
    interface StockFinder {
        "onUcSymbolSelected"?: (event: StockFinderCustomEvent<any>) => void;
    }
    interface StockPrice {
        "stockSymbol"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "side-bar": SideBar;
        "stock-finder": StockFinder;
        "stock-price": StockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "side-bar": LocalJSX.SideBar & JSXBase.HTMLAttributes<HTMLSideBarElement>;
            "stock-finder": LocalJSX.StockFinder & JSXBase.HTMLAttributes<HTMLStockFinderElement>;
            "stock-price": LocalJSX.StockPrice & JSXBase.HTMLAttributes<HTMLStockPriceElement>;
        }
    }
}