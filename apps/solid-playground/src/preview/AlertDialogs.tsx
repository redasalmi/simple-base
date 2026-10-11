import { Api, Example } from "./Preview";

export function AlertDialogs() {
  return (
    <>
      <Example
        title="Try the dialog"
        description="Open a real modal to inspect its scrim, keyboard focus, and actions. Escape or Cancel dismisses it; focus returns to the trigger."
        example="alert-dialog/Archive"
      />
      <Example
        title="Anatomy"
        description="The root provides state without rendering an element. Trigger opens the native dialog Content; Header and Footer organize the accessible copy and explicit actions."
        example="alert-dialog/Anatomy"
      />
      <Api
        rows={[
          [
            "AlertDialog",
            "state and context root",
            "Supports controlled open or uncontrolled defaultOpen state and does not render a DOM element.",
          ],
          [
            "AlertDialogTrigger / AlertDialogContent",
            "button / native dialog",
            "Trigger opens the modal. Content owns native dialog attributes, events, and the forwarded HTMLDialogElement ref.",
          ],
          [
            "AlertDialogIcon",
            "div; always aria-hidden",
            "Optional visual warning. It does not replace the title or an accessible description.",
          ],
          [
            "AlertDialogHeader / AlertDialogKicker",
            "div / paragraph",
            "Header groups the text. Use the optional kicker only when it adds useful context.",
          ],
          [
            "AlertDialogTitle / AlertDialogDescription",
            "h2 (set level to change it) / paragraph",
            "Generated IDs connect both parts to Content through aria-labelledby and aria-describedby while they are rendered.",
          ],
          [
            "AlertDialogFooter / AlertDialogCancel / AlertDialogAction",
            "div / buttons",
            "Footer holds explicit actions. Cancel receives initial focus; Action defaults to the danger variant.",
          ],
          [
            "…props",
            "native attributes",
            "Button props pass through Trigger, Cancel, and Action; dialog props pass through Content.",
          ],
        ]}
      />
    </>
  );
}
