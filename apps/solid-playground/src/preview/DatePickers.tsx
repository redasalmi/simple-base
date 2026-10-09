import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerControl,
  DatePickerDescription,
  DatePickerError,
  DatePickerInput,
  DatePickerLabel,
  DatePickerPortal,
  DatePickerPositioner,
  DatePickerTrigger,
  type DateValue,
  parseDateInput,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { Api, Example, FormDemo } from "./Preview";

function Popup() {
  return (
    <DatePickerPortal>
      <DatePickerPositioner>
        <DatePickerContent>
          <DatePickerCalendar />
        </DatePickerContent>
      </DatePickerPositioner>
    </DatePickerPortal>
  );
}

export function DatePickers() {
  const [due, setDue] = createSignal<DateValue | null>(null);
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <Example
        title="Pick a date"
        description="Type a date and press Enter, or open the calendar with the trigger. Arrow keys move by day, Page Up and Page Down by month (add Shift for a year), and Home and End jump to the start and end of the month. Select the month heading to switch to the month and year views; Escape closes the calendar."
        code={
          "const [due, setDue] = createSignal<DateValue | null>(null);\n\n<DatePicker value={due()} onValueChange={(value) => setDue(value)}>\n  <DatePickerLabel>Due date</DatePickerLabel>\n  <DatePickerControl>\n    <DatePickerInput />\n    <DatePickerTrigger />\n  </DatePickerControl>\n  <DatePickerPortal>\n    <DatePickerPositioner>\n      <DatePickerContent>\n        <DatePickerCalendar />\n      </DatePickerContent>\n    </DatePickerPositioner>\n  </DatePickerPortal>\n</DatePicker>"
        }
      >
        <div class="preview-stack">
          <div class="preview-fields">
            <DatePicker value={due()} onValueChange={(value) => setDue(value)}>
              <DatePickerLabel>Due date</DatePickerLabel>
              <DatePickerControl>
                <DatePickerInput />
                <DatePickerTrigger />
              </DatePickerControl>
              <Popup />
            </DatePicker>
          </div>
          <p class="preview-status" role="status">
            {due() ? `Selected value: ${due()!.toString()}` : "No date selected."}
          </p>
        </div>
      </Example>
      <Example
        title="Limit the range"
        description="min and max disable the days outside the range, and the month arrows stop at its edges. Type 12/31/2026 and leave the field: dates outside the range are clamped to it. Create the bounds with parseDateInput."
        code={
          '<DatePicker\n  defaultValue={parseDateInput("2026-10-12")}\n  min={parseDateInput("2026-10-05")}\n  max={parseDateInput("2026-11-20")}\n>\n  <DatePickerLabel>Appointment</DatePickerLabel>\n  {/* Control and popup as above. */}\n  <DatePickerDescription>Between October 5 and November 20.</DatePickerDescription>\n</DatePicker>'
        }
      >
        <div class="preview-fields">
          <DatePicker
            defaultValue={parseDateInput("2026-10-12")}
            min={parseDateInput("2026-10-05")}
            max={parseDateInput("2026-11-20")}
          >
            <DatePickerLabel>Appointment</DatePickerLabel>
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <DatePickerDescription>Between October 5 and November 20.</DatePickerDescription>
            <Popup />
          </DatePicker>
        </div>
      </Example>
      <Example
        title="Locale and time zone"
        description="locale sets the input format, the first day of the week, and the calendar's labels. timeZone decides which day is outlined as today and defaults to the user's own, so it only needs setting when today should follow a fixed place."
        code={
          '<DatePicker locale="fr-FR" timeZone="Europe/Paris" defaultValue={parseDateInput("2026-10-12")}>\n  <DatePickerLabel>Date de livraison</DatePickerLabel>\n  {/* Control and popup as above. */}\n</DatePicker>'
        }
      >
        <div class="preview-fields">
          <DatePicker
            locale="fr-FR"
            timeZone="Europe/Paris"
            defaultValue={parseDateInput("2026-10-12")}
          >
            <DatePickerLabel>Date de livraison</DatePickerLabel>
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <Popup />
          </DatePicker>
        </div>
      </Example>
      <Example
        title="Popup placement and height"
        description="placement opens the calendar above the field here, and fixedWeeks always shows six weeks so the popup keeps its height as you change months. onOpenChange reports when the calendar opens and closes."
        code={
          'const [open, setOpen] = createSignal(false);\n\n<DatePicker placement="top-start" fixedWeeks onOpenChange={setOpen}>\n  <DatePickerLabel>Review date</DatePickerLabel>\n  {/* Control and popup as above. */}\n</DatePicker>'
        }
      >
        <div class="preview-stack">
          <div class="preview-fields">
            <DatePicker placement="top-start" fixedWeeks onOpenChange={setOpen}>
              <DatePickerLabel>Review date</DatePickerLabel>
              <DatePickerControl>
                <DatePickerInput />
                <DatePickerTrigger />
              </DatePickerControl>
              <Popup />
            </DatePicker>
          </div>
          <p class="preview-status" role="status">
            {open() ? "The calendar is open." : "The calendar is closed."}
          </p>
        </div>
      </Example>
      <Example
        title="States"
        description="Required adds the label marker, read-only keeps the date visible but closed, and disabled dims the whole field. invalid shows the error, which the date picker never sets on its own."
        code={
          '<DatePicker required>…</DatePicker>\n<DatePicker readOnly defaultValue={parseDateInput("2026-09-01")}>…</DatePicker>\n<DatePicker disabled defaultValue={parseDateInput("2027-09-01")}>…</DatePicker>\n<DatePicker invalid defaultValue={parseDateInput("2026-10-10")}>…</DatePicker>'
        }
      >
        <div class="preview-fields">
          <DatePicker required>
            <DatePickerLabel>Start date</DatePickerLabel>
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <Popup />
          </DatePicker>
          <DatePicker readOnly defaultValue={parseDateInput("2026-09-01")}>
            <DatePickerLabel>Contract start</DatePickerLabel>
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <Popup />
          </DatePicker>
          <DatePicker disabled defaultValue={parseDateInput("2027-09-01")}>
            <DatePickerLabel>Renewal date</DatePickerLabel>
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <DatePickerDescription>Set by your plan.</DatePickerDescription>
            <Popup />
          </DatePicker>
          <DatePicker invalid defaultValue={parseDateInput("2026-10-10")}>
            <DatePickerLabel>Delivery date</DatePickerLabel>
            <DatePickerControl>
              <DatePickerInput />
              <DatePickerTrigger />
            </DatePickerControl>
            <DatePickerError>Deliveries run Monday to Friday.</DatePickerError>
            <Popup />
          </DatePicker>
        </div>
      </Example>
      <Example
        title="In a form"
        description="With name and defaultValue the date picker needs no signal: a hidden input submits the date as an ISO string while the visible input shows it in the locale's format, and Reset restores the initial date."
        code={
          '<form>\n  <DatePicker name="start" defaultValue={parseDateInput("2026-10-15")}>\n    <DatePickerLabel>Start date</DatePickerLabel>\n    {/* Control and popup as above. */}\n  </DatePicker>\n  <Button type="submit">Submit</Button>\n  <Button type="reset">Reset</Button>\n</form>'
        }
      >
        <FormDemo>
          <div class="preview-fields">
            <DatePicker name="start" defaultValue={parseDateInput("2026-10-15")}>
              <DatePickerLabel>Start date</DatePickerLabel>
              <DatePickerControl>
                <DatePickerInput />
                <DatePickerTrigger />
              </DatePickerControl>
              <Popup />
            </DatePicker>
          </div>
        </FormDemo>
      </Example>
      <Api
        rows={[
          [
            "DatePicker",
            "id · name · form · required · disabled · readOnly · invalid",
            "Set on the root; the label, input, trigger, and messages read them. id is the input's id and is generated when omitted. name submits the date as YYYY-MM-DD through a hidden input.",
          ],
          [
            "value / defaultValue / onValueChange",
            "DateValue | null · (value: DateValue | null, valueAsString: string) => void",
            'Create dates with parseDateInput("2026-10-03"). null means no date; valueAsString holds the text shown in the input.',
          ],
          [
            "min / max",
            "DateValue",
            "Days outside the range are disabled and navigation stops at its edges. Typed dates outside it are clamped to the nearest bound when the input loses focus.",
          ],
          [
            "locale / timeZone",
            "string",
            "locale (default en-US) sets the input format, week start, and labels. timeZone decides which day is today and defaults to the user's time zone.",
          ],
          [
            "placement / fixedWeeks / onOpenChange",
            "Placement · boolean · (open: boolean) => void",
            "placement picks the popup side (default bottom-start). fixedWeeks keeps six weeks on screen. onOpenChange reports when the calendar opens and closes.",
          ],
          [
            "DatePickerLabel / DatePickerControl / DatePickerInput",
            "label / group / text input",
            "Control draws the bordered field. The input owns id, name, and its ARIA attributes; set those on the root.",
          ],
          [
            "DatePickerTrigger",
            "button",
            "Opens and closes the calendar. Renders a calendar icon by default; pass an icon as children.",
          ],
          [
            "DatePickerPortal / DatePickerPositioner / DatePickerContent",
            "portal / positioned popup",
            "Content stays hidden until the calendar opens. Pass mount to the portal to render inside a modal.",
          ],
          [
            "DatePickerCalendar",
            "day, month, and year grids",
            "Navigation and all three views, labeled for assistive technology. Only the active view is shown.",
          ],
          [
            "DatePickerDescription / DatePickerError",
            "paragraph",
            "Linked to the input with aria-describedby while rendered. The error renders only while invalid is set.",
          ],
          [
            "Styles",
            "@simple-base/css/date-picker",
            "Included in the main stylesheet. For individual imports, load @simple-base/tokens/css once before the component styles.",
          ],
        ]}
      />
    </>
  );
}
