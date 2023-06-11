import type { Components, JSX } from "../types/components";

interface StockPrice extends Components.StockPrice, HTMLElement {}
export const StockPrice: {
  prototype: StockPrice;
  new (): StockPrice;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
