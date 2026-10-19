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
import { createSignal } from "solid-js";

import { CloseIcon } from "../icons";

export default function WorkspaceDetails() {
  let dialog: HTMLDialogElement | undefined;
  const [result, setResult] = createSignal("The dialog has not been opened yet.");

  return (
    <Dialog>
      <div class="preview-stack">
        <div>
          <DialogTrigger variant="secondary">View workspace details</DialogTrigger>
        </div>
        <p class="preview-status" role="status">
          {result()}
        </p>
      </div>
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
          <DialogClose aria-label="Close workspace details">
            <CloseIcon />
          </DialogClose>
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
  );
}
