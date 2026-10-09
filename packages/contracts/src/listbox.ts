import type { Placement } from "./placement";

export type ListboxOption = {
  label: string;
  /** Unique, non-empty identifier. */
  value: string;
  disabled?: boolean;
};

/** Root options shared by the single-value pickers, Select and Combobox. */
export type ListboxOptions = {
  /** Id of the root element. Generated when omitted. */
  id?: string;
  /** Submits the selected option's value with the form, or an empty string when nothing is selected. */
  name?: string;
  /** Id of a form to associate the control with when it sits outside that form. Read on mount; later changes are not tracked. */
  form?: string;
  placeholder?: string;
  options: readonly ListboxOption[];
  /** Controlled value. `null` means no selection; omit for uncontrolled state. */
  value?: string | null;
  /** Initial value for uncontrolled state. `null` means no selection. */
  defaultValue?: string | null;
  /** Disables the control and leaves it out of form submission. */
  disabled?: boolean;
  /** Marks the control invalid and shows the error message. */
  invalid?: boolean;
  /** Marks the label required and makes the browser require a selection before submitting. */
  required?: boolean;
  /** Side of the control the popup opens on. */
  placement?: Placement;
  /** Called with the selected option's value, or `null` when the selection is cleared. */
  onValueChange?: (value: string | null) => void;
  /** Called when the popup opens or closes. */
  onOpenChange?: (open: boolean) => void;
};
