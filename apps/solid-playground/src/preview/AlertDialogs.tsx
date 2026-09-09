import { createSignal } from "solid-js";
import { AlertDialog, Button } from "@simple-base/solid";
import { Api, Example } from "./Preview";

export function AlertDialogs() {
  let dialog: HTMLDialogElement | undefined;
  const [result, setResult] = createSignal(
    "No action taken. This demo does not archive real data.",
  );
  const openDialog = () => {
    if (!dialog) return;
    dialog.returnValue = "";
    dialog.showModal();
  };

  return (
    <>
      <Example
        title="Try the dialog"
        description="Open a real modal to inspect its scrim, keyboard focus, and actions. Escape or Cancel dismisses it; focus returns to the trigger."
        code={
          'let dialog: HTMLDialogElement | undefined;\n\n<Button onClick={() => dialog?.showModal()}>Archive workspace</Button>\n<AlertDialog ref={dialog}>\n  <AlertDialog.Icon>!</AlertDialog.Icon>\n  <AlertDialog.Content>\n    <AlertDialog.Kicker>Destructive action</AlertDialog.Kicker>\n    <AlertDialog.Title>Archive this workspace?</AlertDialog.Title>\n    <AlertDialog.Description>\n      It will be removed from the active workspace list.\n    </AlertDialog.Description>\n  </AlertDialog.Content>\n  <AlertDialog.Actions>\n    <Button variant="secondary" onClick={() => dialog?.close()}>Cancel</Button>\n    <Button variant="danger" onClick={() => dialog?.close("archive")}>Archive</Button>\n  </AlertDialog.Actions>\n</AlertDialog>'
        }
      >
        <div class="preview-stack">
          <div>
            <Button variant="danger-subtle" onClick={openDialog}>
              Archive workspace
            </Button>
          </div>
          <p class="preview-status" role="status">
            {result()}
          </p>
        </div>
      </Example>
      <AlertDialog
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
        <AlertDialog.Icon>!</AlertDialog.Icon>
        <AlertDialog.Content>
          <AlertDialog.Kicker>Destructive action</AlertDialog.Kicker>
          <AlertDialog.Title>Archive this workspace?</AlertDialog.Title>
          <AlertDialog.Description>
            It will be removed from the active workspace list. This is a local demonstration; no
            data will be changed.
          </AlertDialog.Description>
        </AlertDialog.Content>
        <AlertDialog.Actions>
          <Button variant="secondary" onClick={() => dialog?.close()}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => dialog?.close("archive")}>
            Archive
          </Button>
        </AlertDialog.Actions>
      </AlertDialog>
      <Example
        title="Anatomy"
        description="All seven exported parts in an inline, non-modal specimen. These example actions only update the demo status message. The kicker is optional; the title and description provide the accessible name and explanation."
      >
        <div class="preview-stack">
          <AlertDialog open class="preview-inline-dialog">
            <AlertDialog.Icon>!</AlertDialog.Icon>
            <AlertDialog.Content>
              <AlertDialog.Kicker>Destructive action</AlertDialog.Kicker>
              <AlertDialog.Title>Archive this workspace?</AlertDialog.Title>
              <AlertDialog.Description>
                You can restore an archived workspace later.
              </AlertDialog.Description>
            </AlertDialog.Content>
            <AlertDialog.Actions>
              <Button
                variant="secondary"
                onClick={() => setResult("Inline specimen: Cancel selected.")}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => setResult("Inline specimen: Archive selected.")}
              >
                Archive
              </Button>
            </AlertDialog.Actions>
          </AlertDialog>
        </div>
      </Example>
      <Api
        rows={[
          [
            "AlertDialog",
            "native dialog root",
            "ref gives access to showModal() and close(). The open attribute alone is non-modal; it does not create a backdrop or focus trap.",
          ],
          [
            ".Icon",
            "div; aria-hidden by default",
            "Optional visual warning. It does not replace the title or an accessible description.",
          ],
          [
            ".Content / .Kicker",
            "div / paragraph",
            "Content groups the text. Use the optional kicker only when it adds useful context.",
          ],
          [
            ".Title / .Description",
            "heading / paragraph",
            "Generated IDs are linked to the root through aria-labelledby and aria-describedby. Include both parts.",
          ],
          [
            ".Actions",
            "div",
            "Holds explicit actions. Put Cancel first so the destructive action does not receive initial focus.",
          ],
          [
            "…props",
            "DialogHtmlAttributes",
            "Native dialog attributes and events pass through. No custom size or variant props; generic non-destructive dialogs use the CSS dialog pattern.",
          ],
        ]}
      />
    </>
  );
}
