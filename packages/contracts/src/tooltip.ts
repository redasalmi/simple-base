import type { Placement } from "./placement";

export type TooltipOptions = {
  /** Base of the ids given to the trigger and content. Generated when omitted. */
  id?: string;
  /** Controlled open state; omit for uncontrolled state. */
  open?: boolean;
  /** Initial open state for uncontrolled state. */
  defaultOpen?: boolean;
  placement?: Placement;
  onOpenChange?: (open: boolean) => void;
};
