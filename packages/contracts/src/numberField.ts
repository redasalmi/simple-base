/** A number field wraps exactly one numeric control; these options are applied to it and its label and messages. */
export type NumberFieldOptions = {
  /** Id of the field's control. Generated when omitted. */
  id?: string;
  name?: string;
  /** Id of a form to associate the control with when it sits outside that form. Read on mount; later changes are not tracked. */
  form?: string;
  /** Controlled value. A string, so partial input such as "1." survives; omit for uncontrolled state. */
  value?: string;
  /** Initial value for uncontrolled state. */
  defaultValue?: string;
  min?: number;
  max?: number;
  step?: number;
  /** Formats the displayed value, e.g. `{ style: "currency", currency: "EUR" }`. */
  formatOptions?: Intl.NumberFormatOptions;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  /** Marks the control invalid and shows the field's error message. When omitted, out-of-range values are invalid. */
  invalid?: boolean;
  /** Called with the input's string value and its parsed number (`NaN` when empty). */
  onValueChange?: (value: string, valueAsNumber: number) => void;
};
