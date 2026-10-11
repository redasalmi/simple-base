import { Radio } from "@simple-base/solid";

export default function Disabled() {
  return (
    <div class="preview-stack">
      <label class="preview-choice">
        <Radio name="unavailable" disabled />
        <span>Unavailable option</span>
      </label>
      <label class="preview-choice">
        <Radio name="locked" defaultChecked disabled />
        <span>Locked selection</span>
      </label>
    </div>
  );
}
