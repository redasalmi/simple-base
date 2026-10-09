import { For, Show, createSignal } from "solid-js";
import {
  Alert,
  AlertActions,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertMark,
  AlertTitle,
  Button,
  StatusLine,
  StatusLineContent,
  StatusLineDescription,
  StatusLineDot,
  StatusLineTitle,
  type StatusValue,
} from "@simple-base/solid";
import { Api, CheckIcon, CloseIcon, Example, WarningIcon } from "./Preview";

export function Alerts() {
  const [showAlert, setShowAlert] = createSignal(true);

  return (
    <>
      <Example
        title="Statuses"
        description="Alerts support success, warning, danger, and info. The status tints the border and the mark; the title and description carry the meaning. Without a status, the alert keeps the neutral border and a danger mark."
        code={
          '<Alert status="danger">\n  <AlertMark>\n    <WarningIcon />\n  </AlertMark>\n  <AlertContent>\n    <AlertTitle>Review your entries</AlertTitle>\n    <AlertDescription>A required field is missing.</AlertDescription>\n  </AlertContent>\n</Alert>'
        }
      >
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
      </Example>
      <Example
        title="Actions and dismissal"
        description="AlertActions holds the recovery path. AlertClose is a plain type=button control: name it with aria-label and remove the alert from your own state. Dismissing here only hides this local specimen."
        code={
          'const [open, setOpen] = createSignal(true);\n\n<Show when={open()}>\n  <Alert status="warning" role="status">\n    <AlertMark>\n      <WarningIcon />\n    </AlertMark>\n    <AlertContent>\n      <AlertTitle>2 invoices are overdue</AlertTitle>\n      <AlertDescription>Send a reminder or record a payment to clear them.</AlertDescription>\n      <AlertActions>\n        <Button size="small" variant="secondary">Send reminders</Button>\n        <Button size="small" variant="ghost">View invoices</Button>\n      </AlertActions>\n    </AlertContent>\n    <AlertClose aria-label="Dismiss overdue invoices alert" onClick={() => setOpen(false)}>\n      <CloseIcon />\n    </AlertClose>\n  </Alert>\n</Show>'
        }
      >
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
              <AlertDescription>
                Send a reminder or record a payment to clear them.
              </AlertDescription>
              <AlertActions>
                <Button size="small" variant="secondary">
                  Send reminders
                </Button>
                <Button size="small" variant="ghost">
                  View invoices
                </Button>
              </AlertActions>
            </AlertContent>
            <AlertClose
              aria-label="Dismiss overdue invoices alert"
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon />
            </AlertClose>
          </Alert>
        </Show>
      </Example>
      <Api
        rows={[
          [
            "Alert status",
            "success | warning | danger | info",
            "Sets data-status. Omit it for a neutral border with a danger mark.",
          ],
          [
            "Alert role",
            "alert | status",
            "Not set by default. Use role=alert for urgent messages inserted after load and role=status for polite updates; leave it off for alerts present when the page renders.",
          ],
          [
            "AlertMark",
            "span, aria-hidden",
            "A decorative icon tile tinted by the status. It is hidden from assistive technology, so the title carries the meaning.",
          ],
          [
            "AlertClose",
            "button, type=button",
            "Never submits a form. It does not hide the alert; handle onClick and give it an accessible name when it contains only an icon.",
          ],
          [
            "Parts",
            "div · span · div · strong · p · div · button",
            "Alert, AlertMark, AlertContent, AlertTitle, AlertDescription, AlertActions, and AlertClose pass native attributes through. class merges with the part's class.",
          ],
          [
            "Styles",
            "@simple-base/css/status",
            "Included in the main stylesheet. The .sb-alert classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}

export function StatusLines() {
  const lines: [StatusValue, string, string][] = [
    ["success", "Changes saved", "Your preferences are up to date."],
    ["warning", "Payment overdue", "INV-0042 was due 12 days ago."],
    ["danger", "Could not save", "Check your connection and try again."],
    ["info", "Read-only workspace", "Ask an owner for editing access."],
  ];

  return (
    <>
      <Example
        title="Statuses"
        description="Status lines support success, warning, danger, and info. The dot is colored by the status and hidden from assistive technology, so keep the title specific."
        code={
          '<StatusLine status="success">\n  <StatusLineDot />\n  <StatusLineContent>\n    <StatusLineTitle>Changes saved</StatusLineTitle>\n    <StatusLineDescription>Your preferences are up to date.</StatusLineDescription>\n  </StatusLineContent>\n</StatusLine>'
        }
      >
        <div class="preview-stack">
          <For each={lines}>
            {([status, title, copy]) => (
              <StatusLine status={status}>
                <StatusLineDot />
                <StatusLineContent>
                  <StatusLineTitle>{title}</StatusLineTitle>
                  <StatusLineDescription>{copy}</StatusLineDescription>
                </StatusLineContent>
              </StatusLine>
            )}
          </For>
        </div>
      </Example>
      <Api
        rows={[
          [
            "StatusLine status",
            "success | warning | danger | info",
            "Sets data-status, which tints the border and colors the dot.",
          ],
          [
            "StatusLineDot",
            "span, aria-hidden",
            "A decorative status dot. Color is supporting information; the title carries the meaning.",
          ],
          [
            "Parts",
            "div · span · div · strong · p",
            "StatusLine, StatusLineDot, StatusLineContent, StatusLineTitle, and StatusLineDescription pass native attributes through. class merges with the part's class.",
          ],
          [
            "Styles",
            "@simple-base/css/status",
            "Included in the main stylesheet. The .sb-status-line classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
