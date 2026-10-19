import { Checkbox } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function IndependentChoices() {
  const [email, setEmail] = createSignal(true);
  const [activity, setActivity] = createSignal(false);

  return (
    <fieldset class="sb-fieldset preview-stack">
      <legend class="sb-heading-5">Notifications</legend>
      <label class="preview-choice">
        <Checkbox checked={email()} onChange={(event) => setEmail(event.currentTarget.checked)} />
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
  );
}
