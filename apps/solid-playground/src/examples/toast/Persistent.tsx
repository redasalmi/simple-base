import { Button } from "@simple-base/solid";

import { toaster } from "./toaster";

export default function Persistent() {
  return (
    <div class="preview-row">
      <Button
        variant="secondary"
        onClick={() =>
          toaster.create({
            id: "export",
            title: "Export ready",
            description: "Your report is ready to download.",
            duration: Infinity,
          })
        }
      >
        Show persistent toast
      </Button>
      <Button variant="ghost" onClick={() => toaster.dismiss()}>
        Dismiss all
      </Button>
    </div>
  );
}
