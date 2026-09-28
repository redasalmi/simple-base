/** A field wraps exactly one control; these options are applied to it and its label and messages. */
export type FieldOptions = {
  /** Id of the field's control. Generated when omitted. */
  id?: string;
  required?: boolean;
  disabled?: boolean;
  /** Marks the control invalid and shows the field's error message. */
  invalid?: boolean;
};
