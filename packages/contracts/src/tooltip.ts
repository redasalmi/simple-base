import type { Placement } from "./placement";

export type TooltipOptions = {
  /** Controlled open state; omit for uncontrolled state. */
  open?: boolean;
  /** Initial open state for uncontrolled state. */
  defaultOpen?: boolean;
  placement?: Placement;
  onOpenChange?: (open: boolean) => void;
};
