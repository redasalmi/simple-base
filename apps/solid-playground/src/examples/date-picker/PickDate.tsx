import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  DatePickerPortal,
  DatePickerPositioner,
  DatePickerTrigger,
  type DateValue,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function PickDate() {
  const [due, setDue] = createSignal<DateValue | null>(null);

  return (
    <div class="preview-stack">
      <div class="preview-fields">
        <DatePicker value={due()} onValueChange={(value) => setDue(value)}>
          <DatePickerLabel>Due date</DatePickerLabel>
          <DatePickerControl>
            <DatePickerInput />
            <DatePickerTrigger />
          </DatePickerControl>
          <DatePickerPortal>
            <DatePickerPositioner>
              <DatePickerContent>
                <DatePickerCalendar />
              </DatePickerContent>
            </DatePickerPositioner>
          </DatePickerPortal>
        </DatePicker>
      </div>
      <p class="preview-status" role="status">
        {due() ? `Selected value: ${due()!.toString()}` : "No date selected."}
      </p>
    </div>
  );
}
