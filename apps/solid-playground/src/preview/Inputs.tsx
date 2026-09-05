import { For } from "solid-js";
import { Checkbox, Input, Radio, Switch, TextArea } from "@simple-base/solid";

const checkboxStates = [
  { label: "Unchecked", props: {} },
  { label: "Checked", props: { checked: true } },
  { label: "Disabled", props: { disabled: true } },
  { label: "Checked disabled", props: { checked: true, disabled: true } },
] as const;

const radioOptions = [
  { label: "Default", value: "default", disabled: false },
  { label: "Compact", value: "compact", disabled: false },
  { label: "Disabled", value: "disabled", disabled: true },
] as const;

export function Inputs() {
  return (
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="sb-text-caption">Components</p>
        <h1 class="sb-heading-1">Inputs</h1>
        <p class="sb-text-body">
          Native form controls styled by <code class="sb-code-text">@simple-base/css</code> classes.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-6 rounded-xl p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <label class="flex flex-col gap-2">
          <span class="sb-text-label">Text input</span>
          <Input placeholder="workspace/team-alpha" />
        </label>

        <label class="flex flex-col gap-2">
          <span class="sb-text-label">Search input</span>
          <Input type="search" placeholder="Search actions" />
        </label>

        <label class="flex flex-col gap-2">
          <span class="sb-text-label">Invalid input</span>
          <Input value="Invalid value" aria-invalid="true" />
        </label>

        <label class="flex flex-col gap-2">
          <span class="sb-text-label">Disabled input</span>
          <Input value="Readonly configuration" disabled />
        </label>
      </div>

      <div class="grid grid-cols-2 gap-6 rounded-xl p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <label class="flex flex-col gap-2">
          <span class="sb-text-label">Textarea</span>
          <TextArea placeholder="Write a compact product note..." />
        </label>

        <label class="flex flex-col gap-2">
          <span class="sb-text-label">Invalid textarea</span>
          <TextArea value="This field needs attention." aria-invalid="true" />
        </label>
      </div>

      <div class="flex flex-col gap-3 rounded-xl p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <h2 class="sb-heading-6">Checkboxes</h2>
        <p class="sb-text-body">
          Checkbox uses the native input element with the{" "}
          <code class="sb-code-text">.sb-checkbox</code> class.
        </p>
        <div class="grid grid-cols-2 gap-4">
          <For each={checkboxStates}>
            {({ label, props }) => (
              <label class="flex items-center gap-3">
                <Checkbox {...props} />
                <span class="sb-text-label">{label}</span>
              </label>
            )}
          </For>
        </div>
      </div>

      <div class="flex flex-col gap-3 rounded-xl p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <h2 class="sb-heading-6">Switches</h2>
        <p class="sb-text-body">
          Switch uses a native checkbox with <code class="sb-code-text">role="switch"</code> and an
          accessible name.
        </p>
        <div class="grid grid-cols-2 gap-4">
          <label class="flex items-center gap-3">
            <Switch aria-label="Realtime sync" checked />
            <span class="sb-text-label">Realtime sync</span>
          </label>

          <label class="flex items-center gap-3">
            <Switch aria-label="Command hints" />
            <span class="sb-text-label">Command hints</span>
          </label>

          <label class="flex items-center gap-3">
            <Switch aria-label="Beta automations" disabled />
            <span class="sb-text-label">Beta automations disabled</span>
          </label>

          <label class="flex items-center gap-3">
            <Switch aria-label="Offline mode" checked disabled />
            <span class="sb-text-label">Offline mode checked disabled</span>
          </label>
        </div>
      </div>

      <div class="flex flex-col gap-3 rounded-xl p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <h2 class="sb-heading-6">Radio group</h2>
        <div class="grid grid-cols-3 gap-4">
          <For each={radioOptions}>
            {(option) => (
              <label class="flex items-center gap-3">
                <Radio
                  name="preview-radio"
                  value={option.value}
                  checked={option.value === "default"}
                  disabled={option.disabled}
                />
                <span class="sb-text-label">{option.label}</span>
              </label>
            )}
          </For>
        </div>
      </div>
    </section>
  );
}
