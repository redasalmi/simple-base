import type { Placement } from "./placement";

export type ComboboxOption = {
  label: string;
  /** Unique, non-empty identifier. Empty string is reserved for no selection. */
  value: string;
  disabled?: boolean;
};

export type ComboboxOptions = {
  id: string;
  label: string;
  name?: string;
  placeholder?: string;
  options: ComboboxOption[];
  /** Controlled value. Empty string means no selection; omit for uncontrolled state. */
  value?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  placement?: Placement;
  /** Called with the selected option value, or an empty string when selection is cleared. */
  onValueChange: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
};
