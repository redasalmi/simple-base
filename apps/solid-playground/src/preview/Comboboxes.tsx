import { createSignal } from "solid-js";
import {
  Button,
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "@simple-base/solid";
import { Api, Example } from "./Preview";

const countries = [
  { label: "Canada", value: "CA" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
  { label: "Japan (unavailable in this demo)", value: "JP", disabled: true },
  { label: "New Zealand", value: "NZ" },
  { label: "Spain", value: "ES" },
  { label: "United Kingdom of Great Britain and Northern Ireland", value: "GB" },
  { label: "United States", value: "US" },
  { label: "Zambia", value: "ZM" },
];

function ChevronDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Comboboxes() {
  const [country, setCountry] = createSignal("");
  const [loaded, setLoaded] = createSignal(false);
  const [destination, setDestination] = createSignal("");

  return (
    <>
      <Example
        title="Search and select"
        description="Type to filter countries, then use the arrow keys and Enter or click an option. Japan is disabled in this demo. Search for a nonmatching term to see the empty message; Escape closes the popup."
        code={
          'const [country, setCountry] = createSignal("");\n\n<Combobox\n  id="country"\n  label="Country"\n  options={countries}\n  placeholder="Search countries"\n  onValueChange={setCountry}\n>\n  <ComboboxLabel />\n  <ComboboxControl>\n    <ComboboxInput />\n    <ComboboxTrigger>\n      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n        <path d="m6 9 6 6 6-6" />\n      </svg>\n    </ComboboxTrigger>\n  </ComboboxControl>\n  <ComboboxPortal>\n    <ComboboxPositioner>\n      <ComboboxContent>\n        <ComboboxList>\n          {(option) => <ComboboxItem option={option} />}\n        </ComboboxList>\n        <ComboboxEmpty>No countries found. Try another search.</ComboboxEmpty>\n      </ComboboxContent>\n    </ComboboxPositioner>\n  </ComboboxPortal>\n</Combobox>'
        }
      >
        <div class="preview-stack">
          <Combobox
            id="preview-country"
            label="Country"
            options={countries}
            placeholder="Search countries"
            onValueChange={setCountry}
          >
            <ComboboxLabel />
            <ComboboxControl>
              <ComboboxInput />
              <ComboboxTrigger>
                <ChevronDown />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxPositioner>
                <ComboboxContent>
                  <ComboboxList>{(option) => <ComboboxItem option={option} />}</ComboboxList>
                  <ComboboxEmpty>No countries found. Try another search.</ComboboxEmpty>
                </ComboboxContent>
              </ComboboxPositioner>
            </ComboboxPortal>
          </Combobox>
          <p class="preview-status" role="status">
            {country()
              ? `Selected value: ${country()}`
              : "No country selected. Typing only filters the list."}
          </p>
        </div>
      </Example>
      <Example
        title="Empty and updated options"
        description="Open the initially empty list, then load a local collection to see the options update. No request is made and no data is saved."
        code={
          'const [loaded, setLoaded] = createSignal(false);\nconst [destination, setDestination] = createSignal("");\n\n<Combobox\n  id="destination"\n  label="Destination"\n  options={loaded() ? countries : []}\n  onValueChange={setDestination}\n>\n  {/* Label and control as above. */}\n  <ComboboxPortal>\n    <ComboboxPositioner>\n      <ComboboxContent>\n        <ComboboxList>\n          {(option) => <ComboboxItem option={option} />}\n        </ComboboxList>\n        <ComboboxEmpty>\n          {loaded() ? "No destinations found." : "No destinations available. Load the example options."}\n        </ComboboxEmpty>\n      </ComboboxContent>\n    </ComboboxPositioner>\n  </ComboboxPortal>\n</Combobox>\n<Button onClick={() => setLoaded(true)} disabled={loaded()}>\n  {loaded() ? "Options loaded" : "Load example options"}\n</Button>'
        }
      >
        <div class="preview-stack">
          <Combobox
            id="preview-destination"
            label="Destination"
            options={loaded() ? countries : []}
            placeholder="Search destinations"
            onValueChange={setDestination}
          >
            <ComboboxLabel />
            <ComboboxControl>
              <ComboboxInput />
              <ComboboxTrigger>
                <ChevronDown />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxPositioner>
                <ComboboxContent>
                  <ComboboxList>{(option) => <ComboboxItem option={option} />}</ComboboxList>
                  <ComboboxEmpty>
                    {loaded()
                      ? "No destinations found. Try another search."
                      : "No destinations available. Load the example options."}
                  </ComboboxEmpty>
                </ComboboxContent>
              </ComboboxPositioner>
            </ComboboxPortal>
          </Combobox>
          <div>
            <Button variant="secondary" disabled={loaded()} onClick={() => setLoaded(true)}>
              {loaded() ? "Options loaded" : "Load example options"}
            </Button>
          </div>
          <p class="preview-status" role="status">
            {destination()
              ? `Selected value: ${destination()}`
              : loaded()
                ? "Example options loaded. Choose a destination."
                : "The collection is empty."}
          </p>
        </div>
      </Example>
      <Api
        rows={[
          [
            "Combobox",
            "id, label, options, onValueChange (required)",
            "The root owns single-selection state and case-insensitive label filtering. Give each instance a unique ID.",
          ],
          [
            "options",
            "{ label: string; value: string; disabled?: boolean }[]",
            "Values identify options and should be unique. Reactive array replacements update both the list and keyboard navigation.",
          ],
          [
            "onValueChange",
            "(value: string) => void",
            "Receives the selected option value, not its label or the search text. An empty string represents a cleared selection.",
          ],
          [
            "value, disabled, invalid, required, name, placement, onOpenChange",
            "optional",
            "value makes selection controlled, where an empty string clears it. disabled dims and blocks the field, invalid switches to the danger border, and required adds the label marker. name submits the option label through the visible input, not its value. placement picks the popup side. onOpenChange reports popup visibility.",
          ],
          [
            "class and native props",
            "every part",
            "Each part accepts reactive class and native attributes. Consumer event handlers run alongside widget handlers, not instead of them. Attributes the widget owns, such as id and role, are excluded.",
          ],
          [
            "ComboboxLabel / ComboboxControl / ComboboxInput",
            "label / wrapper / text input",
            "Label uses the root label by default. Control groups the input and trigger; the input stays focused while navigating suggestions.",
          ],
          [
            "ComboboxTrigger",
            "button",
            'Opens or closes suggestions. Direct SVG children use the system icon size; mark decorative icons with aria-hidden="true".',
          ],
          [
            "ComboboxPortal / ComboboxPositioner / ComboboxContent",
            "popup composition",
            "Portal mounts under document.body by default. Inside a native modal dialog, pass mount={dialog()} using a signal-backed dialog ref to keep the popup interactive. Positioner anchors it to the control, and Content hides all popup children when closed.",
          ],
          [
            "ComboboxList / ComboboxItem",
            "render callback / option",
            "List supplies the filtered options. Render an Item with its option prop; disabled options cannot be selected.",
          ],
          [
            "ComboboxEmpty",
            "status message",
            "Place beside List inside Content. It appears only when the popup is open and the filtered collection has no options.",
          ],
          [
            "Styles",
            "@simple-base/css/combobox",
            "Included in the main stylesheet. For individual imports, load @simple-base/tokens/css once before the component styles.",
          ],
        ]}
      />
    </>
  );
}
