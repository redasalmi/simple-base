import { Field, FieldError, FieldInput, FieldLabel } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function FieldStates() {
  const [name, setName] = createSignal("AB");
  const invalid = () => name().trim().length < 3;

  return (
    <div class="preview-fields">
      <Field>
        <FieldLabel>Default</FieldLabel>
        <FieldInput placeholder="Workspace name" />
      </Field>
      <Field>
        <FieldLabel>Filled</FieldLabel>
        <FieldInput defaultValue="Design system" />
      </Field>
      <Field>
        <FieldLabel>Read-only</FieldLabel>
        <FieldInput defaultValue="workspace/design" readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>Disabled</FieldLabel>
        <FieldInput defaultValue="Managed by your team" />
      </Field>
      <Field invalid={invalid()}>
        <FieldLabel>Workspace name</FieldLabel>
        <FieldInput value={name()} onInput={(event) => setName(event.currentTarget.value)} />
        <FieldError>Use at least three characters.</FieldError>
      </Field>
    </div>
  );
}
