import { Switch } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function OnAndOff() {
  const [sync, setSync] = createSignal(true);
  const [hints, setHints] = createSignal(false);

  return (
    <div class="preview-stack">
      <label class="preview-choice">
        <Switch checked={sync()} onChange={(event) => setSync(event.currentTarget.checked)} />
        <span>Live preview</span>
      </label>
      <label class="preview-choice">
        <Switch checked={hints()} onChange={(event) => setHints(event.currentTarget.checked)} />
        <span>Command hints</span>
      </label>
      <p class="preview-status" role="status">
        Live preview {sync() ? "on" : "off"}; command hints {hints() ? "on" : "off"}.
      </p>
    </div>
  );
}
