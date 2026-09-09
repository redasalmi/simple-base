import { For, createSignal } from "solid-js";
import { Checkbox, Input, Radio, Switch, TextArea, type InputProps } from "@simple-base/solid";
import { Api, Example, Field } from "./Preview";

const inputTypes = [
  ["text", "Text", "Workspace name"],
  ["search", "Search", "Search components"],
  ["email", "Email", "alex@example.com"],
  ["password", "Password", "Enter a password"],
  ["url", "URL", "https://example.com"],
  ["tel", "Telephone", "+1 555 0100"],
  ["number", "Number", "12"],
  ["date", "Date", ""],
  ["time", "Time", ""],
  ["datetime-local", "Date and time", ""],
  ["month", "Month", ""],
  ["week", "Week", ""],
] as const satisfies readonly (readonly [NonNullable<InputProps["type"]>, string, string])[];

export function Inputs() {
  const [name, setName] = createSignal("AB");
  const invalid = () => name().trim().length < 3;
  return (
    <>
      <Example
        title="Field states"
        description="Default, filled, read-only, disabled, and invalid. Edit the short workspace name to resolve the example error."
        code={
          '<label for="workspace">Workspace</label>\n<Input id="workspace" value={name()}\n  onInput={(event) => setName(event.currentTarget.value)}\n  aria-invalid={invalid()} aria-describedby="name-help" />\n<p id="name-help">Use at least three characters.</p>'
        }
      >
        <div class="preview-fields">
          <Field label="Default">
            <Input placeholder="Workspace name" />
          </Field>
          <Field label="Filled">
            <Input value="Design system" />
          </Field>
          <Field label="Read-only">
            <Input value="workspace/design" readOnly />
          </Field>
          <Field label="Disabled">
            <Input value="Managed by your team" disabled />
          </Field>
          <Field label="Workspace name">
            <Input
              value={name()}
              onInput={(event) => setName(event.currentTarget.value)}
              aria-invalid={invalid()}
              aria-describedby="name-help"
            />
          </Field>
          <p
            id="name-help"
            class={invalid() ? "sb-field-error preview-note" : "preview-note"}
            role="status"
          >
            {invalid() ? "Use at least three characters." : "The workspace name is long enough."}
          </p>
        </div>
      </Example>
      <Example
        title="Native input types"
        description="Text-entry and date types retain browser parsing, validation, and pickers. Their exact appearance depends on your browser."
        code={
          '<Input type="email" placeholder="alex@example.com" />\n<Input type="number" min={0} step={1} />\n<Input type="date" />'
        }
      >
        <div class="preview-fields">
          <For each={inputTypes}>
            {([type, label, placeholder]) => (
              <Field label={label}>
                <Input type={type} placeholder={placeholder} />
              </Field>
            )}
          </For>
        </div>
      </Example>
      <Example
        title="Browser-owned controls"
        description="File and color controls also accept native props. The file stays local; this preview does not upload it."
        code={'<Input type="file" accept="image/*" />\n<Input type="color" value="#7660a4" />'}
      >
        <div class="preview-fields">
          <Field label="Image file">
            <Input type="file" accept="image/*" />
          </Field>
          <Field label="Color">
            <Input type="color" value="#7660a4" />
          </Field>
        </div>
      </Example>
      <Api
        rows={[
          [
            "type",
            'native input type; defaults to "text"',
            "Checkbox and radio types are excluded. Use their dedicated components; use Button for actions and the CSS range style for sliders.",
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
            "Applies error styling. Validation logic and a linked error message belong to the consuming app.",
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
  const [note, setNote] = createSignal("");
  return (
    <>
      <Example
        title="Field states"
        description="An empty field, existing content, a read-only note, and a disabled field. Drag the lower corner to resize vertically."
        code={
          '<TextArea placeholder="Add a note…" />\n<TextArea value="A read-only note." readOnly />'
        }
      >
        <div class="preview-fields">
          <Field label="Default">
            <TextArea placeholder="Add a note…" />
          </Field>
          <Field label="Filled">
            <TextArea value="Document the decision, not just the outcome." />
          </Field>
          <Field label="Read-only">
            <TextArea value="This note is part of the archived record." readOnly />
          </Field>
          <Field label="Disabled">
            <TextArea value="Editing is unavailable for this example." disabled />
          </Field>
        </div>
      </Example>
      <Example
        title="Validation & feedback"
        description="This local example requires a note. The error treatment clears when text is entered; the character count updates as you type."
        code={
          '<TextArea value={note()}\n  onInput={(event) => setNote(event.currentTarget.value)}\n  aria-invalid={!note().trim()} aria-describedby="note-help" />'
        }
      >
        <div class="preview-stack">
          <Field label="Decision note">
            <TextArea
              value={note()}
              onInput={(event) => setNote(event.currentTarget.value)}
              aria-invalid={!note().trim()}
              aria-describedby="note-help"
            />
          </Field>
          <p
            id="note-help"
            class={!note().trim() ? "sb-field-error preview-note" : "preview-note"}
            role="status"
          >
            {note().trim() ? `${note().length} characters` : "Add a note before continuing."}
          </p>
        </div>
      </Example>
      <Api
        rows={[
          [
            "value / onInput",
            "native value and event",
            "Use a signal for controlled content. No autosizing or validation logic is added.",
          ],
          ["readOnly / disabled", "boolean", "Native field states, with shared Input styling."],
          [
            "aria-invalid",
            "boolean",
            "Marks the field visually. Associate explanatory text using aria-describedby.",
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
  const [email, setEmail] = createSignal(true);
  const [activity, setActivity] = createSignal(false);
  return (
    <>
      <Example
        title="Independent choices"
        description="Each option is independent. Click the label or press Space on a focused checkbox to toggle it."
        code={
          "<label>\n  <Checkbox checked={email()}\n    onChange={(event) => setEmail(event.currentTarget.checked)} />\n  Email updates\n</label>"
        }
      >
        <fieldset class="sb-fieldset preview-stack">
          <legend class="sb-heading-5">Notifications</legend>
          <label class="preview-choice">
            <Checkbox
              checked={email()}
              onChange={(event) => setEmail(event.currentTarget.checked)}
            />
            <span>Email updates</span>
          </label>
          <label class="preview-choice">
            <Checkbox
              checked={activity()}
              onChange={(event) => setActivity(event.currentTarget.checked)}
            />
            <span>Activity summary</span>
          </label>
          <p class="preview-status" role="status">
            {Number(email()) + Number(activity())} of 2 options selected.
          </p>
        </fieldset>
      </Example>
      <Example
        title="Disabled states"
        description="Both unchecked and checked disabled states are shown. Disabled controls retain their value but cannot be changed."
        code={"<Checkbox disabled />\n<Checkbox checked disabled />"}
      >
        <div class="preview-stack">
          <label class="preview-choice">
            <Checkbox disabled />
            <span>Unavailable option</span>
          </label>
          <label class="preview-choice">
            <Checkbox checked disabled />
            <span>Required by your team</span>
          </label>
        </div>
      </Example>
      <Api
        rows={[
          [
            "checked / onChange",
            "boolean / native event",
            "Read event.currentTarget.checked. Use a label or an accessible name.",
          ],
          [
            "disabled",
            "boolean",
            "Prevents activation and removes the control from the tab order.",
          ],
          [
            "…props",
            'InputHTMLAttributes (except "type")',
            'Renders type="checkbox". No custom variants or sizes; mixed-state artwork is not provided by the current stylesheet.',
          ],
        ]}
      />
    </>
  );
}

export function Radios() {
  const [density, setDensity] = createSignal("comfortable");
  return (
    <>
      <Example
        title="One selection"
        description="A shared name keeps the options exclusive. Use arrow keys within the group to change the selection."
        code={
          '<fieldset>\n  <legend>Row spacing</legend>\n  <label><Radio name="density" value="comfortable" checked /> Comfortable</label>\n  <label><Radio name="density" value="compact" /> Compact</label>\n</fieldset>'
        }
      >
        <fieldset class="sb-fieldset preview-stack">
          <legend class="sb-heading-5">Row spacing</legend>
          <For
            each={[
              ["comfortable", "Comfortable"],
              ["compact", "Compact"],
              ["dense", "Dense"],
            ]}
          >
            {([value, label]) => (
              <label class="preview-choice">
                <Radio
                  name="density"
                  value={value}
                  checked={density() === value}
                  onChange={() => setDensity(value!)}
                />
                <span>{label}</span>
              </label>
            )}
          </For>
          <p class="preview-status" role="status">
            Selected: {density()}.
          </p>
        </fieldset>
      </Example>
      <Example
        title="Disabled states"
        description="An unavailable option and a locked selection. These specimens use separate groups so the selected state remains unambiguous."
        code={'<Radio name="unavailable" disabled />\n<Radio name="locked" checked disabled />'}
      >
        <div class="preview-stack">
          <label class="preview-choice">
            <Radio name="unavailable" disabled />
            <span>Unavailable option</span>
          </label>
          <label class="preview-choice">
            <Radio name="locked" checked disabled />
            <span>Locked selection</span>
          </label>
        </div>
      </Example>
      <Api
        rows={[
          ["name", "string", "Use the same name for choices belonging to one decision."],
          [
            "value / checked / onChange",
            "native input props",
            "The selected radio contributes its value to a native form.",
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
  const [sync, setSync] = createSignal(true);
  const [hints, setHints] = createSignal(false);
  return (
    <>
      <Example
        title="On & off"
        description="A switch applies a setting immediately. These settings only affect their local status text and reset when you leave the page."
        code={
          '<Switch aria-label="Live preview" checked={enabled()}\n  onChange={(event) => setEnabled(event.currentTarget.checked)} />'
        }
      >
        <div class="preview-stack">
          <label class="preview-choice">
            <Switch
              aria-label="Live preview"
              checked={sync()}
              onChange={(event) => setSync(event.currentTarget.checked)}
            />
            <span>Live preview</span>
          </label>
          <label class="preview-choice">
            <Switch
              aria-label="Command hints"
              checked={hints()}
              onChange={(event) => setHints(event.currentTarget.checked)}
            />
            <span>Command hints</span>
          </label>
          <p class="preview-status" role="status">
            Live preview {sync() ? "on" : "off"}; command hints {hints() ? "on" : "off"}.
          </p>
        </div>
      </Example>
      <Example
        title="Disabled states"
        description="Unavailable off and on settings. Keep the label visible to explain which preference is locked."
        code={
          '<Switch aria-label="Unavailable setting" disabled />\n<Switch aria-label="Required setting" checked disabled />'
        }
      >
        <div class="preview-stack">
          <label class="preview-choice">
            <Switch aria-label="Unavailable setting" disabled />
            <span>Unavailable setting</span>
          </label>
          <label class="preview-choice">
            <Switch aria-label="Required setting" checked disabled />
            <span>Required setting</span>
          </label>
        </div>
      </Example>
      <Api
        rows={[
          [
            "aria-label / aria-labelledby",
            "one is required",
            "The type contract requires an accessible name. Match it to the visible label.",
          ],
          [
            "checked / onChange",
            "boolean / native event",
            'Uses checkbox state and role="switch". Do not provide aria-checked separately.',
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
