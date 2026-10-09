export type TabsOptions = {
  /** Id of the root element, also the base of the tab and panel ids. Generated when omitted. */
  id?: string;
  /** Controlled selected tab value; omit for uncontrolled state. */
  value?: string;
  /** Initial tab for uncontrolled state. Set it or `value` so one tab is selected and focusable. */
  defaultValue?: string;
  /** Called with the value of the newly selected tab. */
  onValueChange?: (value: string) => void;
};
