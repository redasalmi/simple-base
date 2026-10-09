import type { Placement } from "./placement";

export type MenuOptions = {
  /** Base of the ids given to the trigger and content. Generated when omitted. */
  id?: string;
  /** Controlled open state; omit for uncontrolled state. */
  open?: boolean;
  /** Initial open state for uncontrolled state. */
  defaultOpen?: boolean;
  placement?: Placement;
  /** Called with the value of the item the user picked. */
  onSelect?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
};

export type MenuItemVariant = "danger";

export type MenuItemOptions = {
  /** Unique identifier within the menu, passed to `onSelect`. */
  value: string;
  disabled?: boolean;
  variant?: MenuItemVariant;
};
