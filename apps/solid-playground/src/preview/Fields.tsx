import { Api, Example } from "./Preview";

export function Fields() {
  return (
    <>
      <Example
        title="Label, description & error"
        description="The root sets id, required, and invalid once; the label, input, and messages are linked from it. Enter a full address to clear the error."
        example="field/DescriptionAndError"
      />
      <Example
        title="States"
        description="Required, read-only, and disabled. A disabled field dims its label and description with the control."
        example="field/States"
      />
      <Example
        title="Text area"
        description="FieldTextArea takes the same wiring. This local example requires a note; the character count updates as you type."
        example="field/TextArea"
      />
      <Api
        rows={[
          [
            "id / required / disabled / invalid",
            "Field props",
            "Set once on the root. The label, control, and messages read them; an id is generated when omitted.",
          ],
          [
            "FieldInput / FieldTextArea",
            "Input / TextArea props",
            "Except id, required, disabled, aria-invalid, and aria-describedby, which come from the root. name and defaultValue pass through for uncontrolled forms. Use one control per Field.",
          ],
          [
            "FieldLabel",
            "LabelHTMLAttributes (except for)",
            "Points at the control and shows the required marker.",
          ],
          [
            "FieldDescription / FieldError",
            "HTMLAttributes (except id)",
            "Linked to the control with aria-describedby while rendered. FieldError renders only while the root is invalid.",
          ],
        ]}
      />
    </>
  );
}
