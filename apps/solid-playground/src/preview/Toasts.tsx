import {
  Button,
  createToaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  ToastIcon,
  ToastTitle,
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { Api, CheckIcon, CloseIcon, Example } from "./Preview";

const toaster = createToaster({ max: 3 });

export function Toasts() {
  const [result, setResult] = createSignal("No project archived yet.");

  return (
    <>
      <Example
        title="Try a toast"
        description="Confirm a completed action without interrupting the task. At most three show at once and later ones wait their turn. Toasts dismiss after five seconds; hovering or focusing the region pauses the timer, Escape dismisses the focused toast, and Alt+T moves focus to the region."
        code={
          'const toaster = createToaster({ max: 3 });\n\n<Toaster toaster={toaster}>\n  {() => (\n    <Toast>\n      <ToastIcon>\n        <CheckIcon />\n      </ToastIcon>\n      <ToastContent>\n        <ToastTitle />\n        <ToastDescription />\n        <ToastAction />\n      </ToastContent>\n      <ToastClose>\n        <CloseIcon />\n      </ToastClose>\n    </Toast>\n  )}\n</Toaster>\n\n<Button\n  onClick={() =>\n    toaster.create({\n      title: "Changes saved",\n      description: "Your preferences are up to date.",\n    })\n  }\n>\n  Save changes\n</Button>'
        }
      >
        <div class="preview-row">
          <Button
            variant="secondary"
            onClick={() =>
              toaster.create({
                title: "Changes saved",
                description: "Your preferences are up to date.",
              })
            }
          >
            Save changes
          </Button>
          <Button
            variant="ghost"
            onClick={() => toaster.create({ title: "Link copied to clipboard" })}
          >
            Copy link
          </Button>
        </div>
      </Example>
      <Example
        title="With an action"
        description="Offer one short follow-up, such as undo. Choosing the action runs its callback and dismisses the toast."
        code={
          'toaster.create({\n  title: "Project archived",\n  description: "Northwind moved to the archive.",\n  action: { label: "Undo", onClick: restoreProject },\n});'
        }
      >
        <div class="preview-stack">
          <div>
            <Button
              variant="secondary"
              onClick={() => {
                setResult("Demo project archived. No real data was changed.");
                toaster.create({
                  title: "Project archived",
                  description: "Northwind moved to the archive.",
                  action: {
                    label: "Undo",
                    onClick: () => setResult("Archive undone. The demo project is active again."),
                  },
                });
              }}
            >
              Archive project
            </Button>
          </div>
          <p class="preview-status" role="status">
            {result()}
          </p>
        </div>
      </Example>
      <Example
        title="Persistent & programmatic"
        description="Pass duration: Infinity to keep a toast until it is dismissed. Reusing an id updates the existing toast instead of stacking a new one."
        code={
          'toaster.create({\n  id: "export",\n  title: "Export ready",\n  description: "Your report is ready to download.",\n  duration: Infinity,\n});\n\ntoaster.dismiss(); // dismisses every toast'
        }
      >
        <div class="preview-row">
          <Button
            variant="secondary"
            onClick={() =>
              toaster.create({
                id: "export",
                title: "Export ready",
                description: "Your report is ready to download.",
                duration: Infinity,
              })
            }
          >
            Show persistent toast
          </Button>
          <Button variant="ghost" onClick={() => toaster.dismiss()}>
            Dismiss all
          </Button>
        </div>
      </Example>
      <Toaster toaster={toaster}>
        {() => (
          <Toast>
            <ToastIcon>
              <CheckIcon />
            </ToastIcon>
            <ToastContent>
              <ToastTitle />
              <ToastDescription />
              <ToastAction />
            </ToastContent>
            <ToastClose>
              <CloseIcon />
            </ToastClose>
          </Toast>
        )}
      </Toaster>
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
