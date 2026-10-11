import { Field, FieldDescription, FieldError, FieldLabel, FieldTextArea } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function TextArea() {
  const [note, setNote] = createSignal("");
  const noteInvalid = () => !note().trim();

  return (
    <div class="preview-stack">
      <Field required invalid={noteInvalid()}>
        <FieldLabel>Decision note</FieldLabel>
        <FieldTextArea value={note()} onInput={(event) => setNote(event.currentTarget.value)} />
        <FieldDescription>{note().length} characters</FieldDescription>
        <FieldError>Add a note before continuing.</FieldError>
      </Field>
    </div>
  );
}
