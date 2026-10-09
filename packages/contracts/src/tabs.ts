type TabsBaseOptions = {
  /** Id of the root element, also the base of the tab and panel ids. Generated when omitted. */
  id?: string;
  /** Called with the value of the newly selected tab. */
  onValueChange?: (value: string) => void;
};

/** One of `value` and `defaultValue` is required, so one tab is selected and reachable with Tab. */
export type TabsOptions = TabsBaseOptions &
  (
    | {
        /** Controlled selected tab value. */
        value: string;
        /** Initial tab for uncontrolled state. */
        defaultValue?: string;
      }
    | {
        /** Controlled selected tab value; omit for uncontrolled state. */
        value?: string;
        /** Initial tab for uncontrolled state. */
        defaultValue: string;
      }
  );
