import { Alert, AlertContent, AlertDescription, AlertMark, AlertTitle } from "@simple-base/solid";

import { CheckIcon, WarningIcon } from "../icons";

export default function Statuses() {
  return (
    <div class="preview-stack">
      <Alert status="danger">
        <AlertMark>
          <WarningIcon />
        </AlertMark>
        <AlertContent>
          <AlertTitle>Review your entries</AlertTitle>
          <AlertDescription>A required field is missing.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert status="success">
        <AlertMark>
          <CheckIcon />
        </AlertMark>
        <AlertContent>
          <AlertTitle>Invoice sent</AlertTitle>
          <AlertDescription>The client will receive it within a few minutes.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert status="info">
        <AlertContent>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertDescription>
            Editing will be unavailable during the maintenance window.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  );
}
