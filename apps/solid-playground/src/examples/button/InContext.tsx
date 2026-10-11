import { Button } from "@simple-base/solid";
import { createSignal } from "solid-js";

export default function InContext() {
  const [lastAction, setLastAction] = createSignal("No changes yet.");

  return (
    <div class="preview-stack">
      <div class="preview-row">
        <Button variant="secondary" onClick={() => setLastAction("Demo changes discarded.")}>
          Cancel
        </Button>
        <Button onClick={() => setLastAction("Demo changes saved.")}>Save changes</Button>
      </div>
      <p class="preview-status" role="status">
        {lastAction()}
      </p>
    </div>
  );
}
