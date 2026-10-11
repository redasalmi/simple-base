import { Card, EmptyState, EmptyStateDescription, EmptyStateTitle } from "@simple-base/solid";

export default function InsideCard() {
  return (
    <Card>
      <h3 class="sb-heading-4">Overdue invoices</h3>
      <EmptyState>
        <EmptyStateTitle level={4}>Nothing overdue</EmptyStateTitle>
        <EmptyStateDescription>Invoices past their due date appear here.</EmptyStateDescription>
      </EmptyState>
    </Card>
  );
}
