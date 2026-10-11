import { Button } from "@simple-base/solid";
import { createSignal } from "solid-js";

import { toaster } from "./toaster";

export default function WithAction() {
  const [result, setResult] = createSignal("No project archived yet.");

  return (
    <div class="preview-stack">
      <div>
        <Button
          variant="secondary"
          onClick={() => {
            setResult("Demo project archived. No real data was changed.");
            toaster.create({
              title: "Project archived",
              description: "Northwind moved to the archive.",
              action: {
                label: "Undo",
                onClick: () => setResult("Archive undone. The demo project is active again."),
              },
            });
          }}
        >
          Archive project
        </Button>
      </div>
      <p class="preview-status" role="status">
        {result()}
      </p>
    </div>
  );
}
