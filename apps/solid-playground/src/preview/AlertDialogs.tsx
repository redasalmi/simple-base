import { AlertDialog, Button } from "@simple-base/solid";

export function AlertDialogs() {
  return (
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <p class="sb-text-caption">Components</p>
        <h1 class="sb-heading-1">Alert Dialog</h1>
        <p class="sb-text-body">
          AlertDialog uses a native <code class="sb-code-text">dialog</code> element, automatically
          wires its title and description, and exposes compound parts for structure.
        </p>
      </div>

      <div class="rounded-xl bg-(--sb-card-bg) p-6 shadow-(--sb-card-shadow) ring-1 ring-(--sb-card-border)">
        <AlertDialog open class="relative">
          <AlertDialog.Icon>!</AlertDialog.Icon>
          <AlertDialog.Content>
            <AlertDialog.Kicker>Destructive action</AlertDialog.Kicker>
            <AlertDialog.Title>Archive selected workspace?</AlertDialog.Title>
            <AlertDialog.Description>
              This will hide active command shortcuts, issue views, and synced snippets from your
              current workspace.
            </AlertDialog.Description>
          </AlertDialog.Content>
          <AlertDialog.Actions>
            <Button variant="tertiary" type="button">
              Cancel
            </Button>
            <Button variant="danger" type="button">
              Archive
            </Button>
          </AlertDialog.Actions>
        </AlertDialog>
      </div>
    </section>
  );
}
