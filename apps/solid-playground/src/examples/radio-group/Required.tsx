import {
  Button,
  Fieldset,
  FieldsetDescription,
  FieldsetError,
  FieldsetLegend,
  RadioGroup,
  RadioGroupItem,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function Required() {
  const [plan, setPlan] = createSignal("");
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
        setPlan("");
        setSubmitted(false);
      }}
    >
      <Fieldset required invalid={submitted() && !plan()}>
        <FieldsetLegend>Plan</FieldsetLegend>
        <FieldsetDescription>You can change plans at any time.</FieldsetDescription>
        <RadioGroup name="plan" value={plan()} onValueChange={setPlan}>
          <RadioGroupItem value="starter">Starter</RadioGroupItem>
          <RadioGroupItem value="team">Team</RadioGroupItem>
        </RadioGroup>
        <FieldsetError>Choose a plan to continue.</FieldsetError>
      </Fieldset>
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
