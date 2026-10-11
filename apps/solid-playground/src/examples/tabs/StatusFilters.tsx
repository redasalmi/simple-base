import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableRowHeader,
  TableWrap,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@simple-base/solid";
import { createSignal, For } from "solid-js";

const invoices = [
  { id: "INV-0001", client: "Harbour & Co", status: "Paid" },
  { id: "INV-0002", client: "Northwind", status: "Draft" },
  { id: "INV-0003", client: "Atlas Studio", status: "Overdue" },
  { id: "INV-0004", client: "Fern Labs", status: "Paid" },
  { id: "INV-0005", client: "Harbour & Co", status: "Sent" },
];

const filters = ["All", "Draft", "Sent", "Paid", "Overdue"];

function invoicesFor(filter: string) {
  return filter === "All" ? invoices : invoices.filter((invoice) => invoice.status === filter);
}

export default function StatusFilters() {
  const [filter, setFilter] = createSignal("All");

  return (
    <div class="preview-stack">
      <Tabs class="preview-tabs" value={filter()} onValueChange={setFilter}>
        <TabsList aria-label="Invoice status">
          <For each={filters}>
            {(status) => (
              <TabsTrigger value={status}>
                {status}
                <Badge variant="muted" size="small">
                  {invoicesFor(status).length}
                </Badge>
              </TabsTrigger>
            )}
          </For>
        </TabsList>
        <For each={filters}>
          {(status) => (
            <TabsContent value={status}>
              <TableWrap>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableColumnHeader>Invoice</TableColumnHeader>
                      <TableColumnHeader>Client</TableColumnHeader>
                      <TableColumnHeader>Status</TableColumnHeader>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <For each={invoicesFor(status)}>
                      {(invoice) => (
                        <TableRow>
                          <TableRowHeader>{invoice.id}</TableRowHeader>
                          <TableCell>{invoice.client}</TableCell>
                          <TableCell>{invoice.status}</TableCell>
                        </TableRow>
                      )}
                    </For>
                  </TableBody>
                </Table>
              </TableWrap>
            </TabsContent>
          )}
        </For>
      </Tabs>
      <p class="preview-status" role="status">
        Selected filter: {filter()}.
      </p>
    </div>
  );
}
