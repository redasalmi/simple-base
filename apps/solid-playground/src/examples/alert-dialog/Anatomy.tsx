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

export default function Anatomy() {
  const [result, setResult] = createSignal("No action taken.");

  return (
    <div class="preview-stack">
      <AlertDialog>
        <div>
          <AlertDialogTrigger variant="secondary">Inspect anatomy</AlertDialogTrigger>
        </div>
        <AlertDialogContent>
          <AlertDialogIcon>
            <WarningIcon />
          </AlertDialogIcon>
          <AlertDialogHeader>
            <AlertDialogKicker>Destructive action</AlertDialogKicker>
            <AlertDialogTitle>Archive this workspace?</AlertDialogTitle>
            <AlertDialogDescription>
              You can restore an archived workspace later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setResult("Cancel selected.")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => setResult("Archive selected.")}>
              Archive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p class="preview-status" role="status">
        {result()}
      </p>
    </div>
  );
}
