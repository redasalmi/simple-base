import {
  Button,
  CheckboxGroup,
  CheckboxGroupItem,
  Field,
  FieldInput,
  FieldLabel,
  Fieldset,
  FieldsetDescription,
  FieldsetError,
  FieldsetLegend,
  RadioGroup,
  RadioGroupItem,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { Api, Example, FormDemo } from "./Preview";

const fieldsetApi = [
  "required / disabled / invalid",
  "Fieldset props",
  "Set once on the root. required marks the legend, disabled disables the native fieldset and every control inside, and invalid shows FieldsetError.",
] as const;

const fieldsetPartsApi = [
  "FieldsetLegend / FieldsetDescription / FieldsetError",
  "legend / p / p",
  "Put the legend first. The fieldset lists the description, and the error while it is rendered, in aria-describedby. FieldsetError renders only while invalid is set.",
] as const;

export function Fieldsets() {
  const [locked, setLocked] = createSignal(true);

  return (
    <>
      <Example
        title="Grouped fields"
        description="A legend names related controls, and the description applies to the whole group. Each control keeps its own Field for its label and messages."
        code={
          '<Fieldset>\n  <FieldsetLegend>Billing address</FieldsetLegend>\n  <FieldsetDescription>Printed on every invoice.</FieldsetDescription>\n  <Field>\n    <FieldLabel>Street</FieldLabel>\n    <FieldInput name="street" />\n  </Field>\n  <Field>\n    <FieldLabel>City</FieldLabel>\n    <FieldInput name="city" />\n  </Field>\n</Fieldset>'
        }
      >
        <Fieldset>
          <FieldsetLegend>Billing address</FieldsetLegend>
          <FieldsetDescription>Printed on every invoice.</FieldsetDescription>
          <div class="preview-fields" style={{ "margin-top": "16px" }}>
            <Field>
              <FieldLabel>Street</FieldLabel>
              <FieldInput name="street" defaultValue="12 Harbour Road" />
            </Field>
            <Field>
              <FieldLabel>City</FieldLabel>
              <FieldInput name="city" defaultValue="Lisbon" />
            </Field>
          </div>
        </Fieldset>
      </Example>
      <Example
        title="Disabled"
        description="disabled uses the native fieldset attribute: every control inside is disabled and skipped by Tab, and the legend and description dim."
        code={"<Fieldset disabled={locked()}>…</Fieldset>"}
      >
        <div class="preview-stack">
          <Fieldset disabled={locked()}>
            <FieldsetLegend>Payment terms</FieldsetLegend>
            <FieldsetDescription>Managed by your team.</FieldsetDescription>
            <RadioGroup name="terms" defaultValue="30">
              <RadioGroupItem value="14">Net 14</RadioGroupItem>
              <RadioGroupItem value="30">Net 30</RadioGroupItem>
            </RadioGroup>
          </Fieldset>
          <div>
            <Button variant="secondary" onClick={() => setLocked((value) => !value)}>
              {locked() ? "Unlock example" : "Lock example"}
            </Button>
          </div>
        </div>
      </Example>
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
  const [schedule, setSchedule] = createSignal("monthly");
  const [plan, setPlan] = createSignal("");
  const [submitted, setSubmitted] = createSignal(false);

  return (
    <>
      <Example
        title="Controlled"
        description="value and onValueChange keep the selection in your state. Arrow keys move the selection within the group."
        code={
          '<Fieldset>\n  <FieldsetLegend>Invoice schedule</FieldsetLegend>\n  <RadioGroup value={schedule()} onValueChange={setSchedule}>\n    <RadioGroupItem value="weekly">Weekly</RadioGroupItem>\n    <RadioGroupItem value="monthly">Monthly</RadioGroupItem>\n    <RadioGroupItem value="quarterly">Quarterly</RadioGroupItem>\n  </RadioGroup>\n</Fieldset>'
        }
      >
        <div class="preview-stack">
          <Fieldset>
            <FieldsetLegend>Invoice schedule</FieldsetLegend>
            <RadioGroup value={schedule()} onValueChange={setSchedule}>
              <RadioGroupItem value="weekly">Weekly</RadioGroupItem>
              <RadioGroupItem value="monthly">Monthly</RadioGroupItem>
              <RadioGroupItem value="quarterly">Quarterly</RadioGroupItem>
            </RadioGroup>
          </Fieldset>
          <p class="preview-status" role="status">
            Selected: {schedule()}.
          </p>
        </div>
      </Example>
      <Example
        title="In a form"
        description="The checked radio submits its value under the group's name. defaultValue picks the initial choice that Reset restores."
        code={
          '<form>\n  <Fieldset>\n    <FieldsetLegend>Currency</FieldsetLegend>\n    <RadioGroup name="currency" defaultValue="eur">\n      <RadioGroupItem value="eur">Euro</RadioGroupItem>\n      <RadioGroupItem value="usd">US dollar</RadioGroupItem>\n      <RadioGroupItem value="gbp" disabled>Pound sterling</RadioGroupItem>\n    </RadioGroup>\n  </Fieldset>\n</form>'
        }
      >
        <FormDemo>
          <Fieldset>
            <FieldsetLegend>Currency</FieldsetLegend>
            <RadioGroup name="currency" defaultValue="eur">
              <RadioGroupItem value="eur">Euro</RadioGroupItem>
              <RadioGroupItem value="usd">US dollar</RadioGroupItem>
              <RadioGroupItem value="gbp" disabled>
                Pound sterling
              </RadioGroupItem>
            </RadioGroup>
          </Fieldset>
        </FormDemo>
      </Example>
      <Example
        title="Required with an error"
        description="required makes every radio natively required. This form sets noValidate so FieldsetError replaces the browser's message; submit without a choice to show it."
        code={
          '<Fieldset required invalid={submitted() && !plan()}>\n  <FieldsetLegend>Plan</FieldsetLegend>\n  <FieldsetDescription>You can change plans at any time.</FieldsetDescription>\n  <RadioGroup name="plan" value={plan()} onValueChange={setPlan}>\n    <RadioGroupItem value="starter">Starter</RadioGroupItem>\n    <RadioGroupItem value="team">Team</RadioGroupItem>\n  </RadioGroup>\n  <FieldsetError>Choose a plan to continue.</FieldsetError>\n</Fieldset>'
        }
      >
        <form
          class="preview-stack"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          onReset={() => {
            setPlan("");
            setSubmitted(false);
          }}
        >
          <Fieldset required invalid={submitted() && !plan()}>
            <FieldsetLegend>Plan</FieldsetLegend>
            <FieldsetDescription>You can change plans at any time.</FieldsetDescription>
            <RadioGroup name="plan" value={plan()} onValueChange={setPlan}>
              <RadioGroupItem value="starter">Starter</RadioGroupItem>
              <RadioGroupItem value="team">Team</RadioGroupItem>
            </RadioGroup>
            <FieldsetError>Choose a plan to continue.</FieldsetError>
          </Fieldset>
          <div class="preview-row">
            <Button type="submit" variant="secondary">
              Submit
            </Button>
            <Button type="reset" variant="ghost">
              Reset
            </Button>
          </div>
        </form>
      </Example>
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
  const [reminders, setReminders] = createSignal(["due"]);
  const [confirmed, setConfirmed] = createSignal<string[]>([]);
  const [submitted, setSubmitted] = createSignal(false);

  return (
    <>
      <Example
        title="Controlled"
        description="value and onValueChange hold the checked values as an array, in the order the boxes appear."
        code={
          '<Fieldset>\n  <FieldsetLegend>Payment reminders</FieldsetLegend>\n  <CheckboxGroup value={reminders()} onValueChange={setReminders}>\n    <CheckboxGroupItem value="before">3 days before the due date</CheckboxGroupItem>\n    <CheckboxGroupItem value="due">On the due date</CheckboxGroupItem>\n    <CheckboxGroupItem value="after">7 days after the due date</CheckboxGroupItem>\n  </CheckboxGroup>\n</Fieldset>'
        }
      >
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
      </Example>
      <Example
        title="In a form"
        description="Each checked box submits its value under the group's name; unchecked boxes submit nothing. defaultValue sets the initial state that Reset restores."
        code={
          '<form>\n  <Fieldset>\n    <FieldsetLegend>Include in summary</FieldsetLegend>\n    <CheckboxGroup name="include" defaultValue={["invoices"]}>\n      <CheckboxGroupItem value="invoices">Invoices</CheckboxGroupItem>\n      <CheckboxGroupItem value="payments">Payments</CheckboxGroupItem>\n      <CheckboxGroupItem value="notes">Client notes</CheckboxGroupItem>\n    </CheckboxGroup>\n  </Fieldset>\n</form>'
        }
      >
        <FormDemo>
          <Fieldset>
            <FieldsetLegend>Include in summary</FieldsetLegend>
            <CheckboxGroup name="include" defaultValue={["invoices"]}>
              <CheckboxGroupItem value="invoices">Invoices</CheckboxGroupItem>
              <CheckboxGroupItem value="payments">Payments</CheckboxGroupItem>
              <CheckboxGroupItem value="notes">Client notes</CheckboxGroupItem>
            </CheckboxGroup>
          </Fieldset>
        </FormDemo>
      </Example>
      <Example
        title="Required with an error"
        description="A required fieldset marks the legend, but the checkboxes are not natively required, since any one of them may satisfy the group. Validate in your app; give a single must-check box its own required."
        code={
          '<Fieldset required invalid={submitted() && confirmed().length === 0}>\n  <FieldsetLegend>Terms</FieldsetLegend>\n  <CheckboxGroup value={confirmed()} onValueChange={setConfirmed}>\n    <CheckboxGroupItem value="totals">I have reviewed the invoice totals</CheckboxGroupItem>\n  </CheckboxGroup>\n  <FieldsetError>Confirm the totals before sending.</FieldsetError>\n</Fieldset>'
        }
      >
        <form
          class="preview-stack"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          onReset={() => {
            setConfirmed([]);
            setSubmitted(false);
          }}
        >
          <Fieldset required invalid={submitted() && confirmed().length === 0}>
            <FieldsetLegend>Terms</FieldsetLegend>
            <CheckboxGroup value={confirmed()} onValueChange={setConfirmed}>
              <CheckboxGroupItem value="totals">
                I have reviewed the invoice totals
              </CheckboxGroupItem>
            </CheckboxGroup>
            <FieldsetError>Confirm the totals before sending.</FieldsetError>
          </Fieldset>
          <div class="preview-row">
            <Button type="submit" variant="secondary">
              Send invoice
            </Button>
            <Button type="reset" variant="ghost">
              Reset
            </Button>
          </div>
        </form>
      </Example>
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
            "value is required and children is the label. class goes on the label; every other prop, including required and indeterminate, goes to the checkbox. name, checked, and aria-invalid come from the group and fieldset.",
          ],
          fieldsetApi,
          fieldsetPartsApi,
        ]}
      />
    </>
  );
}
