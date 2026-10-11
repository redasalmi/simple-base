import { Api, Example } from "./Preview";

export function Inputs() {
  return (
    <>
      <Example
        title="Field states"
        description="Default, filled, read-only, disabled, and invalid, each labeled with Field. Edit the short workspace name to resolve the example error."
        example="input/FieldStates"
      />
      <Example
        title="In a form"
        description="Uncontrolled inputs need no signals. name submits each value with the form, and defaultValue is what Reset restores."
        example="input/InForm"
        form
      />
      <Example
        title="Native input types"
        description="Text-entry types retain browser validation and mobile keyboards. Their exact appearance depends on your browser."
        example="input/NativeTypes"
      />
      <Api
        rows={[
          [
            "type",
            '"text" | "email" | "password" | "search" | "tel" | "url"; defaults to "text"',
            "Only text-entry types. Use Checkbox and Radio for choices, Button for actions, and the CSS range style for sliders.",
          ],
          [
            "defaultValue",
            "string",
            "Initial value for uncontrolled inputs; form.reset() restores it. A value given through value is cleared by a reset.",
          ],
          [
            "value / onInput",
            "native value and event",
            "Use a signal when the rest of your interface depends on the entered value.",
          ],
          [
            "readOnly / disabled",
            "boolean",
            "Read-only fields remain focusable and selectable. Disabled fields cannot be edited or focused.",
          ],
          [
            "aria-invalid",
            "boolean",
            "Applies error styling. Inside a Field, set invalid on the root instead; it also links the error message.",
          ],
          [
            "…props",
            "InputHTMLAttributes",
            "Native attributes, ref, events, and class pass through. No custom size or variant props.",
          ],
        ]}
      />
    </>
  );
}

export function TextAreas() {
  return (
    <>
      <Example
        title="Field states"
        description="An empty field, existing content, a read-only note, and a disabled field, each labeled with Field. Drag the lower corner to resize vertically."
        example="textarea/FieldStates"
      />
      <Example
        title="Validation & feedback"
        description="This local example requires a note. The error clears when text is entered."
        example="textarea/Validation"
      />
      <Api
        rows={[
          [
            "defaultValue",
            "string",
            "Initial content for uncontrolled text areas; form.reset() restores it.",
          ],
          [
            "value / onInput",
            "native value and event",
            "Use a signal for controlled content. No autosizing or validation logic is added.",
          ],
          ["readOnly / disabled", "boolean", "Native field states, with shared Input styling."],
          [
            "aria-invalid",
            "boolean",
            "Marks the field visually. Inside a Field, set invalid on the root instead; it also links the error message.",
          ],
          [
            "…props",
            "TextareaHTMLAttributes",
            "Includes placeholder, required, maxLength, rows, ref, and class. The stylesheet sets a 120px minimum height.",
          ],
        ]}
      />
    </>
  );
}

export function Checkboxes() {
  return (
    <>
      <Example
        title="Independent choices"
        description="Each option is independent. Click the label or press Space on a focused checkbox to toggle it."
        example="checkbox/IndependentChoices"
      />
      <Example
        title="Select all"
        description="A parent checkbox shows the mixed state while only some of its options are checked. Toggling it checks or clears them all."
        example="checkbox/SelectAll"
      />
      <Example
        title="In a form"
        description="Checked boxes submit their name and value; unchecked ones submit nothing. defaultChecked sets the initial state that Reset restores."
        example="checkbox/InForm"
        form
      />
      <Example
        title="Disabled states"
        description="Both unchecked and checked disabled states are shown. Disabled controls retain their value but cannot be changed."
        example="checkbox/Disabled"
      />
      <Api
        rows={[
          [
            "defaultChecked",
            "boolean",
            "Initial state for uncontrolled checkboxes; form.reset() restores it. A state given through checked is cleared by a reset.",
          ],
          [
            "checked / onChange",
            "boolean / native event",
            "Read event.currentTarget.checked. Use a label or an accessible name.",
          ],
          [
            "indeterminate",
            "boolean",
            'Shows a dash for a partly selected group; assistive tech reads it as "mixed". The browser clears it when the user toggles the box, so derive it from the group state.',
          ],
          [
            "disabled",
            "boolean",
            "Prevents activation and removes the control from the tab order.",
          ],
          [
            "…props",
            'InputHTMLAttributes (except "type")',
            'Renders type="checkbox". No custom variants or sizes.',
          ],
        ]}
      />
    </>
  );
}

export function Radios() {
  return (
    <>
      <Example
        title="One selection"
        description="A shared name keeps the options exclusive. Use arrow keys within the group to change the selection."
        example="radio/OneSelection"
      />
      <Example
        title="In a form"
        description="The checked radio submits its value under the group's name. defaultChecked picks the initial choice that Reset restores."
        example="radio/InForm"
        form
      />
      <Example
        title="Disabled states"
        description="An unavailable option and a locked selection. These specimens use separate groups so the selected state remains unambiguous."
        example="radio/Disabled"
      />
      <Api
        rows={[
          ["name", "string", "Use the same name for choices belonging to one decision."],
          [
            "value / checked / onChange",
            "native input props",
            "The selected radio contributes its value to a native form.",
          ],
          [
            "defaultChecked",
            "boolean",
            "Initial choice for uncontrolled groups; form.reset() restores it.",
          ],
          [
            "…props",
            'InputHTMLAttributes (except "type")',
            'Renders type="radio". Supports disabled, required, ref, and class; no custom variants or sizes.',
          ],
        ]}
      />
    </>
  );
}

export function Switches() {
  return (
    <>
      <Example
        title="On & off"
        description="A switch applies a setting immediately. These settings only affect their local status text and reset when you leave the page."
        example="switch/OnAndOff"
      />
      <Example
        title="In a form"
        description="A switch submits like a checkbox: its name and value while on, nothing while off. defaultChecked sets the state that Reset restores."
        example="switch/InForm"
        form
      />
      <Example
        title="Disabled states"
        description="Unavailable off and on settings. Keep the label visible to explain which preference is locked."
        example="switch/Disabled"
      />
      <Api
        rows={[
          [
            "Accessible name",
            "label, aria-label, or aria-labelledby",
            "Wrap the switch in a label, or point a label's for at its id, like a checkbox. Use aria-label only for a switch with no visible text.",
          ],
          [
            "checked / onChange",
            "boolean / native event",
            'Uses checkbox state and role="switch". Do not provide aria-checked separately.',
          ],
          [
            "defaultChecked",
            "boolean",
            "Initial state for uncontrolled switches; form.reset() restores it.",
          ],
          [
            "…props",
            'InputHTMLAttributes (except "type", "role", "aria-checked")',
            "Supports disabled, name, value, ref, and class. No custom variants or sizes.",
          ],
        ]}
      />
    </>
  );
}
