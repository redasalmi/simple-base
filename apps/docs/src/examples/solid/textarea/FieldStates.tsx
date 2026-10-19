import { Field, FieldLabel, FieldTextArea } from "@simple-base/solid";

export default function FieldStates() {
  return (
    <div class="preview-fields">
      <Field>
        <FieldLabel>Default</FieldLabel>
        <FieldTextArea placeholder="Add a note…" />
      </Field>
      <Field>
        <FieldLabel>Filled</FieldLabel>
        <FieldTextArea defaultValue="Document the decision, not just the outcome." />
      </Field>
      <Field>
        <FieldLabel>Read-only</FieldLabel>
        <FieldTextArea defaultValue="This note is part of the archived record." readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>Disabled</FieldLabel>
        <FieldTextArea defaultValue="Editing is unavailable for this example." />
      </Field>
    </div>
  );
}
