export type DialogOptions = {
  /** Controlled open state; omit for uncontrolled state. */
  open?: boolean;
  /** Initial open state for uncontrolled state. */
  defaultOpen?: boolean;
  /** Called with the requested state when the trigger, a close button, an action, or Escape opens or closes the dialog. */
  onOpenChange?: (open: boolean) => void;
};
