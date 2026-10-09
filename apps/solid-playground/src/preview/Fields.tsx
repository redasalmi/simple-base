import {
  Field,
  FieldDescription,
  FieldError,
  FieldInput,
  FieldLabel,
  FieldTextArea,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { Api, Example } from "./Preview";

export function Fields() {
  const [email, setEmail] = createSignal("billing@");
  const [note, setNote] = createSignal("");
  const emailInvalid = () => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email());
  const noteInvalid = () => !note().trim();

  return (
    <>
      <Example
        title="Label, description & error"
        description="The root sets id, required, and invalid once; the label, input, and messages are linked from it. Enter a full address to clear the error."
        code={
          '<Field id="client-email" required invalid={invalid()}>\n  <FieldLabel>Client email</FieldLabel>\n  <FieldInput type="email" name="email" value={email()}\n    onInput={(event) => setEmail(event.currentTarget.value)} />\n  <FieldDescription>Invoices are sent to this address.</FieldDescription>\n  <FieldError>Enter a full email address, like billing@example.com.</FieldError>\n</Field>'
        }
      >
        <div class="preview-fields">
          <Field id="client-email" required invalid={emailInvalid()}>
            <FieldLabel>Client email</FieldLabel>
            <FieldInput
              type="email"
              name="email"
              value={email()}
              onInput={(event) => setEmail(event.currentTarget.value)}
            />
            <FieldDescription>Invoices are sent to this address.</FieldDescription>
            <FieldError>Enter a full email address, like billing@example.com.</FieldError>
          </Field>
        </div>
      </Example>
      <Example
        title="States"
        description="Required, read-only, and disabled. A disabled field dims its label and description with the control."
        code={
          '<Field required>…</Field>\n<Field>\n  <FieldInput defaultValue="workspace/design" readOnly />\n</Field>\n<Field disabled>…</Field>'
        }
      >
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
      </Example>
      <Example
        title="Text area"
        description="FieldTextArea takes the same wiring. This local example requires a note; the character count updates as you type."
        code={
          "<Field required invalid={!note().trim()}>\n  <FieldLabel>Decision note</FieldLabel>\n  <FieldTextArea value={note()}\n    onInput={(event) => setNote(event.currentTarget.value)} />\n  <FieldDescription>{note().length} characters</FieldDescription>\n  <FieldError>Add a note before continuing.</FieldError>\n</Field>"
        }
      >
        <div class="preview-stack">
          <Field required invalid={noteInvalid()}>
            <FieldLabel>Decision note</FieldLabel>
            <FieldTextArea value={note()} onInput={(event) => setNote(event.currentTarget.value)} />
            <FieldDescription>{note().length} characters</FieldDescription>
            <FieldError>Add a note before continuing.</FieldError>
          </Field>
        </div>
      </Example>
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
