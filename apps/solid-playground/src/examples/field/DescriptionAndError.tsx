import { Field, FieldDescription, FieldError, FieldInput, FieldLabel } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function DescriptionAndError() {
  const [email, setEmail] = createSignal("billing@");
  const emailInvalid = () => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email());

  return (
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
  );
}
