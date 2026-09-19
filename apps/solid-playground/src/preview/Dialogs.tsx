import { createSignal } from "solid-js";
import {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogKicker,
  DialogTitle,
  DialogTrigger,
} from "@simple-base/solid";
import { Api, Example } from "./Preview";

export function Dialogs() {
  let dialog: HTMLDialogElement | undefined;
  const [result, setResult] = createSignal("The dialog has not been opened yet.");

  return (
    <>
      <Dialog>
        <Example
          title="Try the dialog"
          description="Open a neutral modal for supporting information or a focused task. Escape, the close control, or Done dismisses it and returns focus to the trigger."
          code={
            '<Dialog>\n  <DialogTrigger variant="secondary">\n    View workspace details\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <div>\n        <DialogKicker>Workspace</DialogKicker>\n        <DialogTitle>Workspace details</DialogTitle>\n      </div>\n      <DialogClose aria-label="Close workspace details">×</DialogClose>\n    </DialogHeader>\n    <DialogDescription>\n      Review the workspace settings before continuing.\n    </DialogDescription>\n    <DialogFooter>\n      <DialogAction value="done">Done</DialogAction>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>'
          }
        >
          <div class="preview-stack">
            <div>
              <DialogTrigger variant="secondary">View workspace details</DialogTrigger>
            </div>
            <p class="preview-status" role="status">
              {result()}
            </p>
          </div>
        </Example>
        <DialogContent
          ref={(element) => {
            dialog = element;
          }}
          onClose={() =>
            setResult(
              dialog?.returnValue === "done"
                ? "Workspace details reviewed."
                : "Dialog dismissed without an action.",
            )
          }
        >
          <DialogHeader>
            <div>
              <DialogKicker>Workspace</DialogKicker>
              <DialogTitle>Workspace details</DialogTitle>
            </div>
            <DialogClose aria-label="Close workspace details">×</DialogClose>
          </DialogHeader>
          <DialogDescription>
            This workspace is visible to twelve members. Billing and access settings are managed by
            workspace owners.
          </DialogDescription>
          <DialogFooter>
            <DialogAction value="done">Done</DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Api
        rows={[
          [
            "Dialog",
            "state and context root",
            "Supports controlled open or uncontrolled defaultOpen state and does not render a DOM element.",
          ],
          [
            "DialogTrigger / DialogContent",
            "button / native dialog",
            "Trigger opens the modal. Content owns native dialog attributes, events, and the forwarded HTMLDialogElement ref.",
          ],
          [
            "DialogHeader / DialogKicker",
            "div / paragraph",
            "Header arranges its content and close control. The kicker is optional supporting context.",
          ],
          [
            "DialogTitle / DialogDescription",
            "heading / paragraph",
            "Generated IDs connect both parts to Content through aria-labelledby and aria-describedby. Include both parts.",
          ],
          [
            "DialogFooter / DialogAction",
            "div / button",
            "Footer holds actions. DialogAction closes the dialog and records its value as the native returnValue.",
          ],
          [
            "DialogClose",
            "button",
            "The icon-sized close control dismisses the dialog. Provide an accessible name when its child is only an icon.",
          ],
          [
            "…props",
            "native attributes",
            "Button props pass through Trigger and Action; native dialog and button props pass through Content and Close.",
          ],
        ]}
      />
    </>
  );
}
