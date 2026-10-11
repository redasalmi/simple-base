import { Badge, Button, Card } from "@simple-base/solid";

export default function Base() {
  return (
    <div class="preview-card-grid">
      <Card>
        <div class="preview-stack">
          <div class="preview-row">
            <h3 class="sb-heading-4">Release notes</h3>
            <Badge>Draft</Badge>
          </div>
          <p class="sb-text-body preview-note">
            Draft prepared for review. Cards group related content; they are not actions or links.
          </p>
          <div class="preview-row">
            <Button size="small">Publish</Button>
            <Button size="small" variant="ghost">
              Discard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
