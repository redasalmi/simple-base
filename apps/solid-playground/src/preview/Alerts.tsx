import { Api, Example } from "./Preview";

export function Alerts() {
  return (
    <>
      <Example
        title="Statuses"
        description="Alerts support success, warning, danger, and info. The status tints the border and the mark; the title and description carry the meaning. Without a status, the alert keeps the neutral border and a danger mark."
        example="alert/Statuses"
      />
      <Example
        title="Actions and dismissal"
        description="AlertActions holds the recovery path. AlertClose is a plain type=button control: name it with aria-label and remove the alert from your own state. Dismissing here only hides this local specimen."
        example="alert/Dismissible"
      />
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
  return (
    <>
      <Example
        title="Statuses"
        description="Status lines support success, warning, danger, and info. The dot is colored by the status and hidden from assistive technology, so keep the title specific."
        example="status-line/Statuses"
      />
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
