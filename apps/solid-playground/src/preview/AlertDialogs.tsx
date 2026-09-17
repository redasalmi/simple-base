import { createSignal } from "solid-js";
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
import { Api, Example } from "./Preview";

export function AlertDialogs() {
  let dialog: HTMLDialogElement | undefined;
  const [result, setResult] = createSignal(
    "No action taken. This demo does not archive real data.",
  );

  return (
    <>
      <AlertDialog>
        <Example
          title="Try the dialog"
          description="Open a real modal to inspect its scrim, keyboard focus, and actions. Escape or Cancel dismisses it; focus returns to the trigger."
          code={
            '<AlertDialog>\n  <AlertDialogTrigger variant="danger-subtle">\n    Archive workspace\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogIcon>!</AlertDialogIcon>\n    <AlertDialogHeader>\n      <AlertDialogKicker>Destructive action</AlertDialogKicker>\n      <AlertDialogTitle>Archive this workspace?</AlertDialogTitle>\n      <AlertDialogDescription>\n        It will be removed from the active workspace list.\n      </AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction value="archive">Archive</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>'
          }
        >
          <div class="preview-stack">
            <div>
              <AlertDialogTrigger variant="danger-subtle">Archive workspace</AlertDialogTrigger>
            </div>
            <p class="preview-status" role="status">
              {result()}
            </p>
          </div>
        </Example>
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
          <AlertDialogIcon>!</AlertDialogIcon>
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
      <Example
        title="Anatomy"
        description="The root provides state without rendering an element. Trigger opens the native dialog Content; Header and Footer organize the accessible copy and explicit actions."
      >
        <div class="preview-stack">
          <AlertDialog>
            <AlertDialogTrigger variant="secondary">Inspect anatomy</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogIcon>!</AlertDialogIcon>
              <AlertDialogHeader>
                <AlertDialogKicker>Destructive action</AlertDialogKicker>
                <AlertDialogTitle>Archive this workspace?</AlertDialogTitle>
                <AlertDialogDescription>
                  You can restore an archived workspace later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setResult("Anatomy example: Cancel selected.")}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => setResult("Anatomy example: Archive selected.")}>
                  Archive
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Example>
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
            "div; aria-hidden by default",
            "Optional visual warning. It does not replace the title or an accessible description.",
          ],
          [
            "AlertDialogHeader / AlertDialogKicker",
            "div / paragraph",
            "Header groups the text. Use the optional kicker only when it adds useful context.",
          ],
          [
            "AlertDialogTitle / AlertDialogDescription",
            "heading / paragraph",
            "Generated IDs are linked to the root through aria-labelledby and aria-describedby. Include both parts.",
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
