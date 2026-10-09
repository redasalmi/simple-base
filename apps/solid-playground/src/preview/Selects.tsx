import {
  Button,
  Select,
  SelectContent,
  SelectControl,
  SelectEmpty,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { Api, Example, FormDemo } from "./Preview";

const timezones = [
  { label: "Central European Time (UTC+01:00)", value: "cet" },
  { label: "Eastern Time (UTC−05:00)", value: "et" },
  { label: "Greenwich Mean Time (UTC+00:00)", value: "gmt" },
  { label: "India Standard Time (UTC+05:30)", value: "ist" },
  { label: "Japan Standard Time (unavailable in this demo)", value: "jst", disabled: true },
  { label: "Pacific Time (UTC−08:00)", value: "pt" },
  { label: "Coordinated Universal Time", value: "utc" },
];

function ChevronDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Selects() {
  const [timezone, setTimezone] = createSignal<string | null>(null);
  const [loaded, setLoaded] = createSignal(false);
  const [region, setRegion] = createSignal<string | null>(null);

  return (
    <>
      <Example
        title="Choose a single option"
        description="Open the list with Enter, Space, or a click, then move with the arrow keys, Home, and End. Type a letter to jump to a matching option. Japan Standard Time is disabled in this demo, and Escape closes the list without changing the value."
        code={
          'const [timezone, setTimezone] = createSignal<string | null>(null);\n\n<Select\n  id="timezone"\n  placeholder="Select a timezone"\n  options={timezones}\n  onValueChange={setTimezone}\n>\n  <SelectLabel>Timezone</SelectLabel>\n  <SelectControl>\n    <SelectTrigger>\n      <SelectValueText />\n      <SelectIndicator>\n        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n          <path d="m6 9 6 6 6-6" />\n        </svg>\n      </SelectIndicator>\n    </SelectTrigger>\n  </SelectControl>\n  <SelectPortal>\n    <SelectPositioner>\n      <SelectContent>\n        <SelectList>\n          {(option) => <SelectItem option={option} />}\n        </SelectList>\n      </SelectContent>\n    </SelectPositioner>\n  </SelectPortal>\n</Select>'
        }
      >
        <div class="preview-stack">
          <Select
            id="preview-timezone"
            placeholder="Select a timezone"
            options={timezones}
            onValueChange={setTimezone}
          >
            <SelectLabel>Timezone</SelectLabel>
            <SelectControl>
              <SelectTrigger>
                <SelectValueText />
                <SelectIndicator>
                  <ChevronDown />
                </SelectIndicator>
              </SelectTrigger>
            </SelectControl>
            <SelectPortal>
              <SelectPositioner>
                <SelectContent>
                  <SelectList>{(option) => <SelectItem option={option} />}</SelectList>
                </SelectContent>
              </SelectPositioner>
            </SelectPortal>
          </Select>
          <p class="preview-status" role="status">
            {timezone()
              ? `Selected value: ${timezone()}`
              : "No timezone selected. The placeholder shows until a value is chosen."}
          </p>
        </div>
      </Example>
      <Example
        title="In a form"
        description="With name and defaultValue the select needs no signal or handler: a hidden native select submits the option value with the form, and Reset restores the initial selection."
        code={
          '<form>\n  <Select\n    name="timezone"\n    options={timezones}\n    defaultValue="utc"\n  >\n    {/* Label, control, and popup as above. */}\n  </Select>\n  <Button type="submit">Submit</Button>\n  <Button type="reset">Reset</Button>\n</form>'
        }
      >
        <FormDemo>
          <Select name="timezone" options={timezones} defaultValue="utc">
            <SelectLabel>Timezone</SelectLabel>
            <SelectControl>
              <SelectTrigger>
                <SelectValueText />
                <SelectIndicator>
                  <ChevronDown />
                </SelectIndicator>
              </SelectTrigger>
            </SelectControl>
            <SelectPortal>
              <SelectPositioner>
                <SelectContent>
                  <SelectList>{(option) => <SelectItem option={option} />}</SelectList>
                </SelectContent>
              </SelectPositioner>
            </SelectPortal>
          </Select>
        </FormDemo>
      </Example>
      <Example
        title="Empty and updated options"
        description="Open the initially empty list to see the empty message, then load a local collection and reopen it. No request is made and no data is saved."
        code={
          'const [loaded, setLoaded] = createSignal(false);\nconst [region, setRegion] = createSignal<string | null>(null);\n\n<Select\n  id="region"\n  placeholder="Select a region"\n  options={loaded() ? timezones : []}\n  onValueChange={setRegion}\n>\n  {/* Label, control, and popup as above. */}\n  <SelectPortal>\n    <SelectPositioner>\n      <SelectContent>\n        <SelectList>\n          {(option) => <SelectItem option={option} />}\n        </SelectList>\n        <SelectEmpty>\n          {loaded() ? "No regions found." : "No regions available. Load the example options."}\n        </SelectEmpty>\n      </SelectContent>\n    </SelectPositioner>\n  </SelectPortal>\n</Select>\n<Button onClick={() => setLoaded(true)} disabled={loaded()}>\n  {loaded() ? "Options loaded" : "Load example options"}\n</Button>'
        }
      >
        <div class="preview-stack">
          <Select
            id="preview-region"
            placeholder="Select a region"
            options={loaded() ? timezones : []}
            onValueChange={setRegion}
          >
            <SelectLabel>Region</SelectLabel>
            <SelectControl>
              <SelectTrigger>
                <SelectValueText />
                <SelectIndicator>
                  <ChevronDown />
                </SelectIndicator>
              </SelectTrigger>
            </SelectControl>
            <SelectPortal>
              <SelectPositioner>
                <SelectContent>
                  <SelectList>{(option) => <SelectItem option={option} />}</SelectList>
                  <SelectEmpty>
                    {loaded()
                      ? "No regions found."
                      : "No regions available. Load the example options."}
                  </SelectEmpty>
                </SelectContent>
              </SelectPositioner>
            </SelectPortal>
          </Select>
          <div>
            <Button variant="secondary" disabled={loaded()} onClick={() => setLoaded(true)}>
              {loaded() ? "Options loaded" : "Load example options"}
            </Button>
          </div>
          <p class="preview-status" role="status">
            {region()
              ? `Selected value: ${region()}`
              : loaded()
                ? "Example options loaded. Choose a region."
                : "The collection is empty."}
          </p>
        </div>
      </Example>
      <Api
        rows={[
          [
            "Select",
            "options (required)",
            "The root owns single-selection state and builds the option collection. id is generated when omitted; pass one to name the root.",
          ],
          [
            "options",
            "{ label: string; value: string; disabled?: boolean }[]",
            "Values identify options and must be unique and non-empty. Reactive array replacements update both the list and keyboard navigation. Read-only arrays, such as one declared as const, are accepted.",
          ],
          [
            "onValueChange",
            "(value: string | null) => void (optional)",
            "Receives the selected option value, not its label. null represents a cleared selection. Not needed for uncontrolled use in a form.",
          ],
          [
            "defaultValue",
            "string | null (optional)",
            "Initial selection for uncontrolled use. null means no selection. form.reset() restores it.",
          ],
          [
            "name / form",
            "string (optional)",
            "name names the hidden native select that carries the option value, so it is submitted with the surrounding form, controlled or not. Omit it to keep the widget outside form submission. form associates it with a form elsewhere on the page.",
          ],
          [
            "value, disabled, invalid, required, placement, onOpenChange",
            "optional",
            "value makes selection controlled, where null clears it. disabled dims and blocks the field, invalid switches to the danger border and shows SelectError, and required adds the label marker. placement picks the popup side. onOpenChange reports popup visibility.",
          ],
          [
            "class and native props",
            "every part",
            "Each part accepts reactive class and native attributes. Consumer event handlers run alongside widget handlers, not instead of them. Attributes the widget owns, such as id and role, are excluded.",
          ],
          [
            "SelectLabel / SelectControl",
            "label / wrapper",
            "Label holds the visible text and names the trigger and the list. Control provides the bordered field and the shared focus ring.",
          ],
          [
            "SelectTrigger / SelectValueText / SelectIndicator",
            "button / selected text / icon slot",
            "The trigger is the native button that opens the listbox. ValueText shows the selected label or the placeholder, and Indicator wraps the decorative icon.",
          ],
          [
            "SelectPortal / SelectPositioner / SelectContent",
            "popup composition",
            "Portal mounts under document.body by default. Inside a native modal dialog, pass mount={dialog()} using a signal-backed dialog ref to keep the popup interactive. Positioner anchors it to the control, and Content hides all popup children when closed.",
          ],
          [
            "SelectList / SelectItem",
            "render callback / option",
            "List supplies the options and listbox semantics. Render an Item with its option prop; disabled options cannot be selected.",
          ],
          [
            "SelectEmpty",
            "status message",
            "Place beside List inside Content. It appears only when the popup is open and the collection has no options.",
          ],
          [
            "SelectDescription / SelectError",
            "paragraph",
            "Linked to the trigger with aria-describedby while rendered. The error renders only while invalid is set.",
          ],
          [
            "Styles",
            "@simple-base/css/select",
            "Included in the main stylesheet. The native .sb-select pattern remains available for plain HTML forms. For individual imports, load @simple-base/tokens/css once before the component styles.",
          ],
        ]}
      />
    </>
  );
}
