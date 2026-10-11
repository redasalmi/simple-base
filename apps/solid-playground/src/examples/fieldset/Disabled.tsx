import {
  Button,
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  RadioGroup,
  RadioGroupItem,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function Disabled() {
  const [locked, setLocked] = createSignal(true);

  return (
    <div class="preview-stack">
      <Fieldset disabled={locked()}>
        <FieldsetLegend>Payment terms</FieldsetLegend>
        <FieldsetDescription>Managed by your team.</FieldsetDescription>
        <RadioGroup name="terms" defaultValue="30">
          <RadioGroupItem value="14">Net 14</RadioGroupItem>
          <RadioGroupItem value="30">Net 30</RadioGroupItem>
        </RadioGroup>
      </Fieldset>
      <div>
        <Button variant="secondary" onClick={() => setLocked((value) => !value)}>
          {locked() ? "Unlock example" : "Lock example"}
        </Button>
      </div>
    </div>
  );
}
