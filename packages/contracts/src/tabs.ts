export type TabsOptions = {
  /** Controlled selected tab value; omit for uncontrolled state. */
  value?: string;
  /** Initial tab for uncontrolled state. Set it or `value` so one tab is selected and focusable. */
  defaultValue?: string;
  /** Called with the value of the newly selected tab. */
  onValueChange?: (value: string) => void;
};
