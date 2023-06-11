import type { Components, JSX } from "../types/components";

interface StockFinder extends Components.StockFinder, HTMLElement {}
export const StockFinder: {
  prototype: StockFinder;
  new (): StockFinder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
