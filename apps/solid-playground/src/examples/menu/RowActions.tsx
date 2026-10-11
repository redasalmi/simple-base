import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPortal,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableRowHeader,
  TableWrap,
} from "@simple-base/solid";
import { createSignal, For } from "solid-js";

import { MoreIcon } from "../icons";

const invoices = [
  { id: "INV-0001", client: "Harbour & Co", status: "Paid" },
  { id: "INV-0002", client: "Northwind", status: "Draft" },
  { id: "INV-0003", client: "Atlas Studio", status: "Overdue" },
];

const actionLabels: Record<string, string> = {
  edit: "Edit",
  duplicate: "Duplicate",
  download: "Download PDF",
  delete: "Delete",
};

export default function RowActions() {
  const [rowAction, setRowAction] = createSignal("Open a row's actions to pick a command.");

  return (
    <div class="preview-stack">
      <TableWrap role="region" aria-label="Invoices" tabIndex={0}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Invoice</TableColumnHeader>
              <TableColumnHeader>Client</TableColumnHeader>
              <TableColumnHeader>Status</TableColumnHeader>
              <TableColumnHeader>Actions</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            <For each={invoices}>
              {(invoice) => (
                <TableRow>
                  <TableRowHeader>{invoice.id}</TableRowHeader>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>
                    <Menu
                      placement="bottom-end"
                      onSelect={(action) =>
                        setRowAction(
                          `${actionLabels[action]} selected for ${invoice.id}. No record was changed.`,
                        )
                      }
                    >
                      <MenuTrigger
                        variant="ghost"
                        size="small"
                        aria-label={`Actions for ${invoice.id}`}
                      >
                        <MoreIcon />
                      </MenuTrigger>
                      <MenuPortal>
                        <MenuPositioner>
                          <MenuContent>
                            <MenuItem value="edit">Edit</MenuItem>
                            <MenuItem value="duplicate">Duplicate</MenuItem>
                            <MenuItem value="download">Download PDF</MenuItem>
                            <MenuSeparator />
                            <MenuItem value="delete" variant="danger">
                              Delete
                            </MenuItem>
                          </MenuContent>
                        </MenuPositioner>
                      </MenuPortal>
                    </Menu>
                  </TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </TableWrap>
      <p class="preview-status" role="status">
        {rowAction()}
      </p>
    </div>
  );
}
