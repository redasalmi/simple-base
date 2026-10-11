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
} from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function Placement() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="preview-stack">
      <div class="preview-fields">
        <DatePicker placement="top-start" fixedWeeks onOpenChange={setOpen}>
          <DatePickerLabel>Review date</DatePickerLabel>
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
        {open() ? "The calendar is open." : "The calendar is closed."}
      </p>
    </div>
  );
}
