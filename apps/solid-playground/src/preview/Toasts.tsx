import { Api, Example } from "./Preview";

export function Toasts() {
  return (
    <>
      <Example
        title="Try a toast"
        description="Confirm a completed action without interrupting the task. At most three show at once and later ones wait their turn. Toasts dismiss after five seconds; hovering or focusing the region pauses the timer, Escape dismisses the focused toast, and Alt+T moves focus to the region."
        example="toast/TryToast"
      />
      <Example
        title="With an action"
        description="Offer one short follow-up, such as undo. Choosing the action runs its callback and dismisses the toast."
        example="toast/WithAction"
      />
      <Example
        title="Persistent & programmatic"
        description="Pass duration: Infinity to keep a toast until it is dismissed. Reusing an id updates the existing toast instead of stacking a new one."
        example="toast/Persistent"
      />
      <Api
        rows={[
          [
            "createToaster",
            "placement · duration · max",
            "Creates the toast store. Placement defaults to bottom-end, duration to 5000ms, and max to 24 visible toasts. Later toasts wait in a queue, and a queued toast ignores dismiss(id) and id updates until it is shown.",
          ],
          [
            "toaster.create / toaster.dismiss",
            "title · description · action · duration · id · status",
            "create returns the toast id. Reusing an id updates that toast. A toast with an action stays until dismissed unless you pass duration. dismiss closes one toast by id, or all toasts when called without one.",
          ],
          [
            "Toaster",
            "live region",
            "Render once near the app root. Its children render the template used for every toast. Pass label to rename the region.",
          ],
          [
            "Toast / ToastIcon / ToastContent",
            "div / span / div",
            "Toast is the positioned, focusable status element. The icon is decorative; Content groups the text and action.",
          ],
          [
            "ToastTitle / ToastDescription",
            "strong / paragraph",
            "Render the title and description passed to create and label the toast. Description renders nothing when omitted.",
          ],
          [
            "ToastAction / ToastClose",
            "button / button",
            "Action renders only when the toast has an action; it runs the callback, then dismisses. Close dismisses and is labeled “Dismiss notification” by default.",
          ],
        ]}
      />
    </>
  );
}
