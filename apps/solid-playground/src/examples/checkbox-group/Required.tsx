import {
  Button,
  CheckboxGroup,
  CheckboxGroupItem,
  Fieldset,
  FieldsetError,
  FieldsetLegend,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function Required() {
  const [confirmed, setConfirmed] = createSignal<string[]>([]);
  const [submitted, setSubmitted] = createSignal(false);

  return (
    <form
      class="preview-stack"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      onReset={() => {
        setConfirmed([]);
        setSubmitted(false);
      }}
    >
      <Fieldset required invalid={submitted() && confirmed().length === 0}>
        <FieldsetLegend>Terms</FieldsetLegend>
        <CheckboxGroup value={confirmed()} onValueChange={setConfirmed}>
          <CheckboxGroupItem value="totals">I have reviewed the invoice totals</CheckboxGroupItem>
        </CheckboxGroup>
        <FieldsetError>Confirm the totals before sending.</FieldsetError>
      </Fieldset>
      <div class="preview-row">
        <Button type="submit" variant="secondary">
          Send invoice
        </Button>
        <Button type="reset" variant="ghost">
          Reset
        </Button>
      </div>
    </form>
  );
}
