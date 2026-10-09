import {
  Button,
  Card,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMark,
  EmptyStateTitle,
} from "@simple-base/solid";
import { createSignal, Show } from "solid-js";

import { Api, Example } from "./Preview";

export function EmptyStates() {
  const [hasRecord, setHasRecord] = createSignal(false);

  return (
    <>
      <Example
        title="With actions"
        description="Explain what is missing and offer a relevant next action. Adding a record here only changes this local specimen."
        code={
          "<EmptyState>\n  <EmptyStateMark>∅</EmptyStateMark>\n  <EmptyStateTitle level={3}>No invoices yet</EmptyStateTitle>\n  <EmptyStateDescription>Create an invoice to start tracking payments.</EmptyStateDescription>\n  <EmptyStateActions>\n    <Button>Create invoice</Button>\n  </EmptyStateActions>\n</EmptyState>"
        }
      >
        <Show
          when={hasRecord()}
          fallback={
            <EmptyState>
              <EmptyStateMark>∅</EmptyStateMark>
              <EmptyStateTitle level={3}>No example records</EmptyStateTitle>
              <EmptyStateDescription>
                Add a record to see this specimen change.
              </EmptyStateDescription>
              <EmptyStateActions>
                <Button onClick={() => setHasRecord(true)}>Add example record</Button>
                <Button variant="ghost">Import from CSV</Button>
              </EmptyStateActions>
            </EmptyState>
          }
        >
          <div class="preview-stack">
            <p class="sb-text-body" role="status">
              One example record added.
            </p>
            <div>
              <Button variant="secondary" onClick={() => setHasRecord(false)}>
                Reset example
              </Button>
            </div>
          </div>
        </Show>
      </Example>
      <Example
        title="Inside a card"
        description="Every part is optional. A filter with no matches needs only a title and a hint, at the heading level of the surrounding section."
        code={
          '<Card>\n  <h3 class="sb-heading-4">Overdue invoices</h3>\n  <EmptyState>\n    <EmptyStateTitle level={4}>Nothing overdue</EmptyStateTitle>\n    <EmptyStateDescription>Invoices past their due date appear here.</EmptyStateDescription>\n  </EmptyState>\n</Card>'
        }
      >
        <Card>
          <h3 class="sb-heading-4">Overdue invoices</h3>
          <EmptyState>
            <EmptyStateTitle level={4}>Nothing overdue</EmptyStateTitle>
            <EmptyStateDescription>Invoices past their due date appear here.</EmptyStateDescription>
          </EmptyState>
        </Card>
      </Example>
      <Api
        rows={[
          [
            "EmptyStateTitle level",
            "1 | 2 | 3 | 4 | 5 | 6 (default 2)",
            "Sets the heading element. Pick the level that follows the surrounding headings; the styling does not change.",
          ],
          [
            "EmptyStateMark",
            "span, aria-hidden",
            "A decorative glyph or icon tile. It is hidden from assistive technology, so the title carries the meaning.",
          ],
          [
            "Parts",
            "div · span · h2 · p · div",
            "EmptyState, EmptyStateMark, EmptyStateTitle, EmptyStateDescription, and EmptyStateActions pass native attributes through. class merges with the part's class.",
          ],
          [
            "Styles",
            "@simple-base/css/empty-state",
            "Included in the main stylesheet. The .sb-empty-state classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
