import { Api, Example } from "./Preview";

export function Comboboxes() {
  return (
    <>
      <Example
        title="Search and select"
        description="Type to filter countries, then use the arrow keys and Enter or click an option. Japan is disabled in this demo. Search for a nonmatching term to see the empty message; Escape closes the popup."
        example="combobox/SearchAndSelect"
      />
      <Example
        title="In a form"
        description="With name, a hidden native select submits the option value, not the typed text, or an empty value while nothing is selected. form.reset() restores defaultValue."
        example="combobox/InForm"
        form
      />
      <Example
        title="Empty and updated options"
        description="Open the initially empty list, then load a local collection to see the options update. No request is made and no data is saved."
        example="combobox/UpdatedOptions"
      />
      <Api
        rows={[
          [
            "Combobox",
            "options (required)",
            "The root owns single-selection state and case-insensitive label filtering. id is generated when omitted; pass one to name the root.",
          ],
          [
            "options",
            "{ label: string; value: string; disabled?: boolean }[]",
            "Values identify options and must be unique and non-empty. Reactive array replacements update both the list and keyboard navigation. Read-only arrays, such as one declared as const, are accepted.",
          ],
          [
            "onValueChange",
            "(value: string | null) => void (optional)",
            "Receives the selected option value, not its label or the search text. null represents a cleared selection.",
          ],
          [
            "defaultValue",
            "string | null (optional)",
            "Initial selection for uncontrolled use; the input shows its label. null means no selection.",
          ],
          [
            "value, disabled, invalid, required, name, form, placement, onOpenChange",
            "optional",
            "value makes selection controlled, where null clears it. disabled dims and blocks the field, invalid switches to the danger border and shows ComboboxError, and required adds the label marker. name submits the option value through a hidden native select, not the typed text, or an empty value while nothing is selected, and form associates that select with a form elsewhere on the page. form.reset() restores the initial selection. placement picks the popup side. onOpenChange reports popup visibility.",
          ],
          [
            "class and native props",
            "every part",
            "Each part accepts reactive class and native attributes. Consumer event handlers run alongside widget handlers, not instead of them. Attributes the widget owns, such as id and role, are excluded.",
          ],
          [
            "ComboboxLabel / ComboboxControl / ComboboxInput",
            "label / wrapper / text input",
            "Label holds the visible text and names the input and the list. Control groups the input and trigger; the input stays focused while navigating suggestions.",
          ],
          [
            "ComboboxTrigger",
            "button",
            'Opens or closes suggestions. Direct SVG children use the system icon size; mark decorative icons with aria-hidden="true".',
          ],
          [
            "ComboboxPortal / ComboboxPositioner / ComboboxContent",
            "popup composition",
            "Portal mounts under document.body by default. Inside a native modal dialog, pass mount={dialog()} using a signal-backed dialog ref to keep the popup interactive. Positioner anchors it to the control. Content is the listbox and is hidden while closed.",
          ],
          [
            "ComboboxList / ComboboxItem",
            "render callback / option",
            "List supplies the filtered options. Render an Item with its option prop; disabled options cannot be selected.",
          ],
          [
            "ComboboxEmpty",
            "status message",
            "Place after Content inside Positioner, since the listbox may only hold options. It appears only when the popup is open and the filtered collection has no options, and its status region announces it.",
          ],
          [
            "ComboboxDescription / ComboboxError",
            "paragraph",
            "Linked to the input with aria-describedby while rendered. The error renders only while invalid is set.",
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
