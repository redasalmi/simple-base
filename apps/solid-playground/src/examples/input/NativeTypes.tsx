import { Field, FieldInput, FieldLabel, type InputProps } from "@simple-base/solid";
import { For } from "solid-js";

const inputTypes = [
  ["text", "Text", "Workspace name"],
  ["search", "Search", "Search components"],
  ["email", "Email", "alex@example.com"],
  ["password", "Password", "Enter a password"],
  ["url", "URL", "https://example.com"],
  ["tel", "Telephone", "+1 555 0100"],
] as const satisfies readonly (readonly [NonNullable<InputProps["type"]>, string, string])[];

export default function NativeTypes() {
  return (
    <div class="preview-fields">
      <For each={inputTypes}>
        {([type, label, placeholder]) => (
          <Field>
            <FieldLabel>{label}</FieldLabel>
            <FieldInput type={type} placeholder={placeholder} />
          </Field>
        )}
      </For>
    </div>
  );
}
