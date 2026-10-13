import { Api, Example } from "./Preview";

export function Tooltips() {
  return (
    <>
      <Example
        title="Name icon-only buttons"
        description="Hover a button, or move focus to it with Tab, to show its tooltip. The tooltip repeats the button's aria-label for sighted users; Escape, a click, or moving away hides it. After the first tooltip opens, moving to the next button shows its tooltip at once."
        example="tooltip/IconButtons"
      />
      <Example
        title="Placement and shortcuts"
        description="placement picks the preferred side; the tooltip flips when there is no room. A Kbd inside the content takes the inverse tooltip colors. Binding the key stays in your app."
        example="tooltip/Placement"
      />
      <Api
        rows={[
          [
            "open / defaultOpen / onOpenChange",
            "boolean",
            "open is controlled. defaultOpen sets the initial state for uncontrolled use. onOpenChange reports visibility changes.",
          ],
          [
            "placement",
            "top | bottom, with -start and -end",
            "The side of the trigger the tooltip prefers. Defaults to bottom; it flips when there is no room.",
          ],
          [
            "TooltipTrigger",
            "Button",
            "Takes the Button variant and size, and defaults to type=button. The tooltip describes the trigger only while open, so give an icon-only trigger an aria-label too.",
          ],
          [
            "TooltipContent",
            "div",
            "Shows after a short hover delay, or at once on keyboard focus. It is not interactive: keep it to a short label, with no links or buttons.",
          ],
          [
            "TooltipArrow",
            "div",
            "Optional. Place it first inside TooltipContent; it points at the trigger from whichever side the tooltip lands on.",
          ],
          [
            "TooltipPortal",
            "mount?: Node",
            "Renders the tooltip under document.body, or under mount — pass a dialog element to show it above a native modal.",
          ],
          [
            "Styles",
            "@simple-base/css/tooltip",
            "Included in the main stylesheet. The .sb-tooltip-content classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
