import { Card } from "@simple-base/solid";

export default function NestedSections() {
  return (
    <Card>
      <h3 class="sb-heading-3">Workspace</h3>
      <p class="sb-text-body preview-note">
        Settings that apply to everyone in this example workspace.
      </p>
      <div class="preview-stack">
        <Card variant="rule">
          <h4 class="sb-heading-4">Members</h4>
          <p class="sb-text-body preview-note">
            Three people can edit documents in this workspace.
          </p>
        </Card>
        <Card variant="rule">
          <h4 class="sb-heading-4">Retention</h4>
          <p class="sb-text-body preview-note">
            Deleted documents are kept for 30 days before they are removed.
          </p>
        </Card>
      </div>
    </Card>
  );
}
