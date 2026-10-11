import { Radio } from "@simple-base/solid";
import { createSignal, For } from "solid-js";

export default function OneSelection() {
  const [density, setDensity] = createSignal("comfortable");

  return (
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
  );
}
