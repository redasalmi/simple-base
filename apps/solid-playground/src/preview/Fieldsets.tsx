import { Api, Example } from "./Preview";

const fieldsetApi = [
  "required / disabled / invalid / labels",
  "Fieldset props",
  'Set once on the root. required marks the legend, disabled disables the native fieldset and every control inside, and invalid shows FieldsetError. labels sets the text read to assistive technology, such as { required: "(obligatoire)" }.',
] as const;

const fieldsetPartsApi = [
  "FieldsetLegend / FieldsetDescription / FieldsetError",
  "legend / p / p",
  'Put the legend first. A required fieldset adds hidden "(required)" text to the legend; set labels.required on the Fieldset to change it. The fieldset lists the description, and the error while it is rendered, in aria-describedby. FieldsetError renders only while invalid is set.',
] as const;

export function Fieldsets() {
  return (
    <>
      <Example
        title="Grouped fields"
        description="A legend names related controls, and the description applies to the whole group. Each control keeps its own Field for its label and messages."
        example="fieldset/Grouped"
      />
      <Example
        title="Disabled"
        description="disabled uses the native fieldset attribute: every control inside is disabled and skipped by Tab, and the legend and description dim."
        example="fieldset/Disabled"
      />
      <Api
        rows={[
          fieldsetApi,
          fieldsetPartsApi,
          [
            "RadioGroup / CheckboxGroup",
            "choice lists",
            "Render inside a Fieldset. They read required and invalid from it.",
          ],
          [
            "Styles",
            "@simple-base/css/field",
            "Included in the main stylesheet. The .sb-fieldset, .sb-choice-list, and .sb-choice classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}

export function RadioGroups() {
  return (
    <>
      <Example
        title="Controlled"
        description="value and onValueChange keep the selection in your state. Arrow keys move the selection within the group."
        example="radio-group/Controlled"
      />
      <Example
        title="In a form"
        description="The checked radio submits its value under the group's name. defaultValue picks the initial choice that Reset restores."
        example="radio-group/InForm"
        form
      />
      <Example
        title="Required with an error"
        description="required makes every radio natively required. This form sets noValidate so FieldsetError replaces the browser's message; submit without a choice to show it."
        example="radio-group/Required"
      />
      <Api
        rows={[
          [
            "value / defaultValue / onValueChange",
            "string",
            "value is controlled; an empty string selects nothing. defaultValue sets the initial choice for uncontrolled groups, which form.reset() restores.",
          ],
          [
            "name",
            "string",
            "Shared by every radio and submitted with the checked value. Generated when omitted.",
          ],
          [
            "RadioGroupItem",
            "label > Radio + span",
            "value is required and children is the label. class goes on the label; every other prop goes to the radio. name, checked, required, and aria-invalid come from the group and fieldset.",
          ],
          fieldsetApi,
          fieldsetPartsApi,
        ]}
      />
    </>
  );
}

export function CheckboxGroups() {
  return (
    <>
      <Example
        title="Controlled"
        description="value and onValueChange hold the checked values as an array, in the order the boxes appear."
        example="checkbox-group/Controlled"
      />
      <Example
        title="In a form"
        description="Each checked box submits its value under the group's name; unchecked boxes submit nothing. defaultValue sets the initial state that Reset restores."
        example="checkbox-group/InForm"
        form
      />
      <Example
        title="Required with an error"
        description="required means at least one checked box: while none is, every box is natively required. This form sets noValidate so FieldsetError replaces the browser's message; submit without a check to show it."
        example="checkbox-group/Required"
      />
      <Api
        rows={[
          [
            "value / defaultValue / onValueChange",
            "string[]",
            "value is controlled. defaultValue sets the initial checked values for uncontrolled groups, which form.reset() restores. onValueChange receives the checked values in document order.",
          ],
          ["name", "string", "Shared by every checkbox and submitted once per checked value."],
          [
            "CheckboxGroupItem",
            "label > Checkbox + span",
            "value is required and children is the label. class goes on the label; every other prop, including required and indeterminate, goes to the checkbox. name, checked, and aria-invalid come from the group and fieldset, and a required fieldset makes every box required while none is checked.",
          ],
          fieldsetApi,
          fieldsetPartsApi,
        ]}
      />
    </>
  );
}
