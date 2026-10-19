import { CheckboxGroup, CheckboxGroupItem, Fieldset, FieldsetLegend } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function Controlled() {
  const [reminders, setReminders] = createSignal(["due"]);

  return (
    <div class="preview-stack">
      <Fieldset>
        <FieldsetLegend>Payment reminders</FieldsetLegend>
        <CheckboxGroup value={reminders()} onValueChange={setReminders}>
          <CheckboxGroupItem value="before">3 days before the due date</CheckboxGroupItem>
          <CheckboxGroupItem value="due">On the due date</CheckboxGroupItem>
          <CheckboxGroupItem value="after">7 days after the due date</CheckboxGroupItem>
        </CheckboxGroup>
      </Fieldset>
      <p class="preview-status" role="status">
        {reminders().length > 0 ? `Selected: ${reminders().join(", ")}.` : "No reminders."}
      </p>
    </div>
  );
}
