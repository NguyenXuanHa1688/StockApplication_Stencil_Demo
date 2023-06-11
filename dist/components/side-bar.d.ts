import type { Components, JSX } from "../types/components";

interface SideBar extends Components.SideBar, HTMLElement {}
export const SideBar: {
  prototype: SideBar;
  new (): SideBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
