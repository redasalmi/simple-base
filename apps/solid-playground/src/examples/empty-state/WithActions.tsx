import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMark,
  EmptyStateTitle,
} from "@simple-base/solid";
import { createSignal, Show } from "solid-js";

export default function WithActions() {
  const [hasRecord, setHasRecord] = createSignal(false);

  return (
    <Show
      when={hasRecord()}
      fallback={
        <EmptyState>
          <EmptyStateMark>∅</EmptyStateMark>
          <EmptyStateTitle level={3}>No example records</EmptyStateTitle>
          <EmptyStateDescription>Add a record to see this specimen change.</EmptyStateDescription>
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
  );
}
