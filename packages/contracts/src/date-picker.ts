import type { DateValue } from "@internationalized/date";

import type { Placement } from "./placement";

/** A date picker wraps exactly one date input; these options are applied to it and its label and messages. */
export type DatePickerOptions = {
  /** Id of the field's input. Generated when omitted. */
  id?: string;
  /** Submitted with the selected date as an ISO 8601 string (`YYYY-MM-DD`), or empty when none is selected. */
  name?: string;
  /** Id of a form to associate the input with when it sits outside that form. Read on mount; later changes are not tracked. */
  form?: string;
  /** Controlled value. `null` means no selection; omit for uncontrolled state. */
  value?: DateValue | null;
  /** Initial value for uncontrolled state. `null` means no selection. */
  defaultValue?: DateValue | null;
  /** Earliest selectable date. */
  min?: DateValue;
  /** Latest selectable date. */
  max?: DateValue;
  /** BCP 47 language tag for the input format, the first day of the week, and the calendar's labels. Defaults to `en-US`. */
  locale?: string;
  /** IANA time zone that decides which day is today, e.g. `Europe/Paris`. Defaults to the user's time zone once mounted, and to UTC on the server and while hydrating. */
  timeZone?: string;
  /** Always shows six weeks, so the calendar keeps the same height from month to month. */
  fixedWeeks?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  /** Marks the input invalid and shows the field's error message. */
  invalid?: boolean;
  /** Side of the field the calendar opens on. Defaults to `bottom-start`. */
  placement?: Placement;
  /** Called with the selected date and the text shown in the input, or `null` and `""` when the date is cleared. */
  onValueChange?: (value: DateValue | null, valueAsString: string) => void;
  onOpenChange?: (open: boolean) => void;
};

export const datePickerDefaults = {
  placement: "bottom-start",
} as const satisfies Required<Pick<DatePickerOptions, "placement">>;
