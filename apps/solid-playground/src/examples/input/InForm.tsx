import { Button, Field, FieldInput, FieldLabel } from "@simple-base/solid";

export default function InForm() {
  return (
    <form class="preview-stack">
      <div class="preview-fields">
        <Field>
          <FieldLabel>Workspace name</FieldLabel>
          <FieldInput name="workspace" defaultValue="Design system" />
        </Field>
        <Field>
          <FieldLabel>Contact email</FieldLabel>
          <FieldInput type="email" name="email" defaultValue="alex@example.com" />
        </Field>
      </div>
      <div class="preview-row">
        <Button type="submit" variant="secondary">
          Submit
        </Button>
        <Button type="reset" variant="ghost">
          Reset
        </Button>
      </div>
    </form>
  );
}
