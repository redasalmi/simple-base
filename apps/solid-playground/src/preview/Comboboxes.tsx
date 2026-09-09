import { createSignal } from "solid-js";
import { Button, Combobox } from "@simple-base/solid";
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
          'const [country, setCountry] = createSignal("");\n\n<Combobox\n  id="country"\n  label="Country"\n  options={countries}\n  placeholder="Search countries"\n  onValueChange={setCountry}\n>\n  <Combobox.Label />\n  <Combobox.Control>\n    <Combobox.Input />\n    <Combobox.Trigger>\n      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n        <path d="m6 9 6 6 6-6" />\n      </svg>\n    </Combobox.Trigger>\n  </Combobox.Control>\n  <Combobox.Portal>\n    <Combobox.Positioner>\n      <Combobox.Content>\n        <Combobox.List>\n          {(option) => <Combobox.Item option={option} />}\n        </Combobox.List>\n        <Combobox.Empty>No countries found. Try another search.</Combobox.Empty>\n      </Combobox.Content>\n    </Combobox.Positioner>\n  </Combobox.Portal>\n</Combobox>'
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
            <Combobox.Label />
            <Combobox.Control>
              <Combobox.Input />
              <Combobox.Trigger>
                <ChevronDown />
              </Combobox.Trigger>
            </Combobox.Control>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Content>
                  <Combobox.List>{(option) => <Combobox.Item option={option} />}</Combobox.List>
                  <Combobox.Empty>No countries found. Try another search.</Combobox.Empty>
                </Combobox.Content>
              </Combobox.Positioner>
            </Combobox.Portal>
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
          'const [loaded, setLoaded] = createSignal(false);\nconst [destination, setDestination] = createSignal("");\n\n<Combobox\n  id="destination"\n  label="Destination"\n  options={loaded() ? countries : []}\n  onValueChange={setDestination}\n>\n  {/* Label and control as above. */}\n  <Combobox.Portal>\n    <Combobox.Positioner>\n      <Combobox.Content>\n        <Combobox.List>\n          {(option) => <Combobox.Item option={option} />}\n        </Combobox.List>\n        <Combobox.Empty>\n          {loaded() ? "No destinations found." : "No destinations available. Load the example options."}\n        </Combobox.Empty>\n      </Combobox.Content>\n    </Combobox.Positioner>\n  </Combobox.Portal>\n</Combobox>\n<Button onClick={() => setLoaded(true)} disabled={loaded()}>\n  {loaded() ? "Options loaded" : "Load example options"}\n</Button>'
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
            <Combobox.Label />
            <Combobox.Control>
              <Combobox.Input />
              <Combobox.Trigger>
                <ChevronDown />
              </Combobox.Trigger>
            </Combobox.Control>
            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Content>
                  <Combobox.List>{(option) => <Combobox.Item option={option} />}</Combobox.List>
                  <Combobox.Empty>
                    {loaded()
                      ? "No destinations found. Try another search."
                      : "No destinations available. Load the example options."}
                  </Combobox.Empty>
                </Combobox.Content>
              </Combobox.Positioner>
            </Combobox.Portal>
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
            "Combobox / .Root",
            "id, label, options, onValueChange; optional placeholder",
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
            ".Label / .Control / .Input",
            "label / wrapper / text input",
            "Label uses the root label by default. Control groups the input and trigger; the input stays focused while navigating suggestions.",
          ],
          [
            ".Trigger",
            "button",
            'Opens or closes suggestions. Direct SVG children use the system icon size; mark decorative icons with aria-hidden="true".',
          ],
          [
            ".Portal / .Positioner / .Content",
            "popup composition",
            "Portal moves the popup to the document body. Positioner anchors it to the control, and Content hides all popup children when closed.",
          ],
          [
            ".List / .Item",
            "render callback / option",
            "List supplies the filtered options. Render an Item with its option prop; disabled options cannot be selected.",
          ],
          [
            ".Empty",
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
