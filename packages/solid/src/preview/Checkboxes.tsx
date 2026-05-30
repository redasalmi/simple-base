import { For } from "solid-js";
import { Checkbox } from "../components/Checkbox";

const states = [
  { label: "Unchecked", props: {} },
  { label: "Checked", props: { checked: true } },
  { label: "Disabled", props: { disabled: true } },
  { label: "Checked disabled", props: { checked: true, disabled: true } },
] as const;

export function Checkboxes() {
  return (
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="sb-text-caption">Components</p>
        <h1 class="sb-heading-1">Checkboxes</h1>
        <p class="sb-text-body">
          Checkbox uses the native input element with the{" "}
          <code class="sb-code-text">.sb-checkbox</code> class.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 rounded-xl p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <For each={states}>
          {({ label, props }) => (
            <label class="flex items-center gap-3">
              <Checkbox {...props} />
              <span class="sb-text-label">{label}</span>
            </label>
          )}
        </For>
      </div>
    </section>
  );
}
