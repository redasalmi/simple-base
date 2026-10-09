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

import { Api, Example } from "./Preview";

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

export function TabLists() {
  const [filter, setFilter] = createSignal("All");

  return (
    <>
      <Example
        title="Status filters"
        description="Arrow keys move between tabs and select them as they go; Home and End jump to the ends, and Tab moves into the selected panel. value and onValueChange keep the selected filter in your state; filtering the rows stays in your app."
        code={
          'const [filter, setFilter] = createSignal("All");\n\n<Tabs value={filter()} onValueChange={setFilter}>\n  <TabsList aria-label="Invoice status">\n    <For each={filters}>\n      {(status) => <TabsTrigger value={status}>{status}</TabsTrigger>}\n    </For>\n  </TabsList>\n  <For each={filters}>\n    {(status) => <TabsContent value={status}>{/* Filtered table */}</TabsContent>}\n  </For>\n</Tabs>'
        }
      >
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
      </Example>
      <Example
        title="Settings sections"
        description="defaultValue picks the first section without any state. A disabled tab stays visible but is skipped by the arrow keys and cannot be selected."
        code={
          '<Tabs defaultValue="profile">\n  <TabsList aria-label="Settings">\n    <TabsTrigger value="profile">Profile</TabsTrigger>\n    <TabsTrigger value="invoicing">Invoicing</TabsTrigger>\n    <TabsTrigger value="billing" disabled>Billing</TabsTrigger>\n  </TabsList>\n  <TabsContent value="profile">…</TabsContent>\n  <TabsContent value="invoicing">…</TabsContent>\n  <TabsContent value="billing">…</TabsContent>\n</Tabs>'
        }
      >
        <Tabs class="preview-tabs" defaultValue="profile">
          <TabsList aria-label="Settings">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
            <TabsTrigger value="billing" disabled>
              Billing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            Your name and email appear on invoices you send. Nothing is saved in this demo.
          </TabsContent>
          <TabsContent value="invoicing">
            Invoices are numbered INV-0001 onward and are due 30 days after they are sent.
          </TabsContent>
          <TabsContent value="billing">
            Only workspace owners can change billing details.
          </TabsContent>
        </Tabs>
      </Example>
      <Api
        rows={[
          [
            "value / defaultValue / onValueChange",
            "string",
            "value is controlled. defaultValue sets the initial tab for uncontrolled use; one of them is required so a tab is selected and reachable with Tab. onValueChange receives the new tab's value.",
          ],
          [
            "Tabs",
            "div",
            "The root holds the list and panels. It adds no class of its own; pass class for layout.",
          ],
          [
            "TabsList",
            "div[role=tablist]",
            "Give it an aria-label that names the set. Scrolls sideways when the tabs overflow.",
          ],
          [
            "TabsTrigger",
            "button[role=tab]",
            "value links it to the TabsContent with the same value. disabled keeps the tab visible but unselectable. Icons and badges sit beside the label.",
          ],
          [
            "TabsContent",
            "div[role=tabpanel]",
            "Hidden unless its tab is selected, and focusable so keyboard users can reach panels with no focusable content.",
          ],
          [
            "Styles",
            "@simple-base/css/tabs",
            "Included in the main stylesheet. The .sb-tabs classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
