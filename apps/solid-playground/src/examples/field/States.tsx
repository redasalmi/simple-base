import { Field, FieldDescription, FieldInput, FieldLabel } from "@simple-base/solid";

export default function States() {
  return (
    <div class="preview-fields">
      <Field required>
        <FieldLabel>Invoice number</FieldLabel>
        <FieldInput defaultValue="INV-0043" />
        <FieldDescription>Numbers continue from your last invoice.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Workspace</FieldLabel>
        <FieldInput defaultValue="workspace/design" readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>Currency</FieldLabel>
        <FieldInput defaultValue="EUR" />
        <FieldDescription>Set per client.</FieldDescription>
      </Field>
    </div>
  );
}
