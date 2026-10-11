import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogIcon,
  AlertDialogKicker,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { WarningIcon } from "../icons";

export default function Archive() {
  let dialog: HTMLDialogElement | undefined;
  const [result, setResult] = createSignal(
    "No action taken. This demo does not archive real data.",
  );

  return (
    <AlertDialog>
      <div class="preview-stack">
        <div>
          <AlertDialogTrigger variant="danger-subtle">Archive workspace</AlertDialogTrigger>
        </div>
        <p class="preview-status" role="status">
          {result()}
        </p>
      </div>
      <AlertDialogContent
        ref={(element) => {
          dialog = element;
        }}
        onClose={() =>
          setResult(
            dialog?.returnValue === "archive"
              ? "Demo workspace archived. No real data was changed."
              : "Dialog dismissed. No changes made.",
          )
        }
      >
        <AlertDialogIcon>
          <WarningIcon />
        </AlertDialogIcon>
        <AlertDialogHeader>
          <AlertDialogKicker>Destructive action</AlertDialogKicker>
          <AlertDialogTitle>Archive this workspace?</AlertDialogTitle>
          <AlertDialogDescription>
            It will be removed from the active workspace list. This is a local demonstration; no
            data will be changed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction value="archive">Archive</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
