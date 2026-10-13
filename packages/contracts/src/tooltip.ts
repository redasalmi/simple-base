import type { Placement } from "./placement";

export type TooltipOptions = {
  /** Base of the ids given to the trigger and content. Generated when omitted. */
  id?: string;
  /** Controlled open state; omit for uncontrolled state. */
  open?: boolean;
  /** Initial open state for uncontrolled state. */
  defaultOpen?: boolean;
  /** Side of the trigger the tooltip opens on. Defaults to `bottom`. */
  placement?: Placement;
  onOpenChange?: (open: boolean) => void;
};

export const tooltipDefaults = {
  placement: "bottom",
} as const satisfies Required<Pick<TooltipOptions, "placement">>;
