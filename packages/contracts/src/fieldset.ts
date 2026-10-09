/** A fieldset groups related controls under one legend; these options are applied to it and its legend and messages. */
export type FieldsetOptions = {
  /** Marks the legend required. A radio group inside also requires a selection. */
  required?: boolean;
  /** Disables the native fieldset, and with it every control inside. */
  disabled?: boolean;
  /** Marks the group invalid and shows the fieldset's error message. */
  invalid?: boolean;
  /** Text read to assistive technology, for example to translate it. Each one defaults to `fieldsetLabels`. */
  labels?: Partial<FieldsetLabels>;
};

export type FieldsetLabels = {
  /** Read after the legend while the fieldset is required. */
  required: string;
};

/** Text read to assistive technology when the caller doesn't pass its own. */
export const fieldsetLabels = {
  required: "(required)",
} as const satisfies FieldsetLabels;

export type RadioGroupOptions = {
  /** Shared name of the radios. Generated when omitted. */
  name?: string;
  /** Controlled value. Empty string means no selection; omit for uncontrolled state. */
  value?: string;
  /** Initial value for uncontrolled state. */
  defaultValue?: string;
  /** Called with the value of the radio the user selected. */
  onValueChange?: (value: string) => void;
};

export type CheckboxGroupOptions = {
  /** Shared name of the checkboxes. */
  name?: string;
  /** Controlled values of the checked boxes; omit for uncontrolled state. */
  value?: string[];
  /** Initial checked values for uncontrolled state. */
  defaultValue?: string[];
  /** Called with the values of the checked boxes, in document order. */
  onValueChange?: (value: string[]) => void;
};
