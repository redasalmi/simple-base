import {
  Alert,
  AlertActions,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertMark,
  AlertTitle,
  Button,
} from "@simple-base/solid";
import { createSignal, Show } from "solid-js";

import { CloseIcon, WarningIcon } from "../icons";

export default function Dismissible() {
  const [showAlert, setShowAlert] = createSignal(true);

  return (
    <Show
      when={showAlert()}
      fallback={
        <div>
          <Button variant="secondary" onClick={() => setShowAlert(true)}>
            Reset example
          </Button>
        </div>
      }
    >
      <Alert status="warning" role="status">
        <AlertMark>
          <WarningIcon />
        </AlertMark>
        <AlertContent>
          <AlertTitle>2 invoices are overdue</AlertTitle>
          <AlertDescription>Send a reminder or record a payment to clear them.</AlertDescription>
          <AlertActions>
            <Button size="small" variant="secondary">
              Send reminders
            </Button>
            <Button size="small" variant="ghost">
              View invoices
            </Button>
          </AlertActions>
        </AlertContent>
        <AlertClose aria-label="Dismiss overdue invoices alert" onClick={() => setShowAlert(false)}>
          <CloseIcon />
        </AlertClose>
      </Alert>
    </Show>
  );
}
