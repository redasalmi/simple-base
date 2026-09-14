import { For } from "solid-js";
import { Badge, Button, Card } from "@simple-base/solid";
import { Api, Example } from "./Preview";

const treatments = [
  [undefined, "Base", "Surface, border, and radius. The default grouping treatment."],
  ["flat", "Flat", "No border or surface. Groups content already inside a surface."],
  ["rule", "Rule", "A single top border and no radius. Separates stacked sections."],
] as const;

export function Cards() {
  return (
    <>
      <Example
        title="Base card"
        description="A div with the sb-card surface: hairline border, large radius, no elevation, and its own interior padding. Omit variant for this treatment."
        code={
          '<Card>\n  <h3 class="sb-heading-4">Release notes</h3>\n  <p class="sb-text-body">Draft prepared for review.</p>\n  <Badge variant="default">Draft</Badge>\n</Card>'
        }
      >
        <div class="preview-card-grid">
          <Card>
            <div class="preview-stack">
              <div class="preview-row">
                <h3 class="sb-heading-4">Release notes</h3>
                <Badge>Draft</Badge>
              </div>
              <p class="sb-text-body preview-note">
                Draft prepared for review. Cards group related content; they are not actions or
                links.
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
      </Example>
      <Example
        title="Surfaces and variants"
        description="Base cards carry the border and surface. flat removes both for content that already sits on a surface, and rule keeps only a top border for stacked sections. Every card is padded by the stylesheet; there is no padding prop to set."
        code={'<Card>…</Card>\n<Card variant="flat">…</Card>\n<Card variant="rule">…</Card>'}
      >
        <div class="preview-card-grid">
          <For each={treatments}>
            {([variant, name, note]) => (
              <Card variant={variant}>
                <h3 class="sb-heading-4">{name}</h3>
                <p class="sb-text-body preview-note">{note}</p>
              </Card>
            )}
          </For>
        </div>
      </Example>
      <Example
        title="Nested sections"
        description="A padded base card can hold rule sections. The outer border groups the surface while each rule separates one setting from the next, and the rule resets the interior padding to a top gap."
        code={
          '<Card>\n  <h3 class="sb-heading-3">Workspace</h3>\n  <Card variant="rule">\n    <h4 class="sb-heading-4">Members</h4>\n  </Card>\n</Card>'
        }
      >
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
      </Example>
      <Api
        rows={[
          [
            "variant",
            '"flat" | "rule" (optional)',
            'Omit variant for the base surface card. "flat" removes the border, surface, and shadow; "rule" keeps only a top border, no radius, and a top-only gap.',
          ],
          [
            "padding",
            "not a prop",
            "Every .sb-card is padded by the stylesheet and rule cards keep only their top gap. Override the .sb-card class from application CSS when a layout needs different spacing.",
          ],
          [
            "…props",
            "JSX.HTMLAttributes<HTMLDivElement>",
            "Renders a div and passes native attributes through. class merges with sb-card instead of replacing it.",
          ],
          [
            "Styles",
            "@simple-base/css/card",
            "Included in the main stylesheet. The .sb-card class and its flat and rule variants stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
