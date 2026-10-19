import { Fieldset, FieldsetLegend, RadioGroup, RadioGroupItem } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function Controlled() {
  const [schedule, setSchedule] = createSignal("monthly");

  return (
    <div class="preview-stack">
      <Fieldset>
        <FieldsetLegend>Invoice schedule</FieldsetLegend>
        <RadioGroup value={schedule()} onValueChange={setSchedule}>
          <RadioGroupItem value="weekly">Weekly</RadioGroupItem>
          <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
          <RadioGroupItem value="quarterly">Quarterly</RadioGroupItem>
        </RadioGroup>
      </Fieldset>
      <p class="preview-status" role="status">
        Selected: {schedule()}.
      </p>
    </div>
  );
}
