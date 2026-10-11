import { Field, FieldError, FieldLabel, FieldTextArea } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function Validation() {
  const [note, setNote] = createSignal("");

  return (
    <div class="preview-stack">
      <Field invalid={!note().trim()}>
        <FieldLabel>Decision note</FieldLabel>
        <FieldTextArea value={note()} onInput={(event) => setNote(event.currentTarget.value)} />
        <FieldError>Add a note before continuing.</FieldError>
      </Field>
    </div>
  );
}
