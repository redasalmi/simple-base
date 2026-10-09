import { For, createSignal } from "solid-js";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemShortcut,
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
import { Api, Example, MoreIcon } from "./Preview";

const invoices = [
  { id: "INV-0001", client: "Harbour & Co", status: "Paid" },
  { id: "INV-0002", client: "Northwind", status: "Draft" },
  { id: "INV-0003", client: "Atlas Studio", status: "Overdue" },
];

const actionLabels: Record<string, string> = {
  edit: "Edit",
  duplicate: "Duplicate",
  download: "Download PDF",
  remind: "Send reminder",
  archive: "Archive",
  delete: "Delete",
};

function ChevronDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Menus() {
  const [rowAction, setRowAction] = createSignal("Open a row's actions to pick a command.");
  const [command, setCommand] = createSignal("Open the menu to pick a command.");

  return (
    <>
      <Example
        title="Row actions"
        description="Open a menu with Enter, Space, the arrow keys, or a click, then move with the arrow keys, Home, and End. Type a letter to jump to a matching item. Escape or Tab closes the menu and returns focus to the trigger."
        code={
          '<Menu placement="bottom-end" onSelect={(action) => runAction(invoice.id, action)}>\n  <MenuTrigger variant="ghost" size="small" aria-label={`Actions for ${invoice.id}`}>\n    <MoreIcon />\n  </MenuTrigger>\n  <MenuPortal>\n    <MenuPositioner>\n      <MenuContent>\n        <MenuItem value="edit">Edit</MenuItem>\n        <MenuItem value="duplicate">Duplicate</MenuItem>\n        <MenuItem value="download">Download PDF</MenuItem>\n        <MenuSeparator />\n        <MenuItem value="delete" variant="danger">Delete</MenuItem>\n      </MenuContent>\n    </MenuPositioner>\n  </MenuPortal>\n</Menu>'
        }
      >
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
      </Example>
      <Example
        title="Groups, shortcuts, and disabled items"
        description="MenuGroup names a set of items with its MenuGroupLabel. Shortcuts are display text; binding the keys stays in your app. Disabled items stay in the list but are skipped by the arrow keys."
        code={
          '<Menu onSelect={setCommand}>\n  <MenuTrigger variant="secondary">Commands <ChevronDown /></MenuTrigger>\n  <MenuPortal>\n    <MenuPositioner>\n      <MenuContent>\n        <MenuGroup>\n          <MenuGroupLabel>Invoice</MenuGroupLabel>\n          <MenuItem value="edit">\n            Edit <MenuItemShortcut>E</MenuItemShortcut>\n          </MenuItem>\n          <MenuItem value="remind" disabled>\n            Send reminder <MenuItemShortcut>R</MenuItemShortcut>\n          </MenuItem>\n        </MenuGroup>\n        <MenuSeparator />\n        <MenuItem value="delete" variant="danger">Delete</MenuItem>\n      </MenuContent>\n    </MenuPositioner>\n  </MenuPortal>\n</Menu>'
        }
      >
        <div class="preview-stack">
          <div>
            <Menu
              onSelect={(action) =>
                setCommand(`${actionLabels[action]} selected. No record was changed.`)
              }
            >
              <MenuTrigger variant="secondary">
                Commands
                <ChevronDown />
              </MenuTrigger>
              <MenuPortal>
                <MenuPositioner>
                  <MenuContent>
                    <MenuGroup>
                      <MenuGroupLabel>Invoice</MenuGroupLabel>
                      <MenuItem value="edit">
                        Edit
                        <MenuItemShortcut>E</MenuItemShortcut>
                      </MenuItem>
                      <MenuItem value="duplicate">
                        Duplicate
                        <MenuItemShortcut>D</MenuItemShortcut>
                      </MenuItem>
                      <MenuItem value="remind" disabled>
                        Send reminder
                        <MenuItemShortcut>R</MenuItemShortcut>
                      </MenuItem>
                    </MenuGroup>
                    <MenuSeparator />
                    <MenuGroup>
                      <MenuGroupLabel>Danger zone</MenuGroupLabel>
                      <MenuItem value="archive">Archive</MenuItem>
                      <MenuItem value="delete" variant="danger">
                        Delete
                      </MenuItem>
                    </MenuGroup>
                  </MenuContent>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
          </div>
          <p class="preview-status" role="status">
            {command()}
          </p>
        </div>
      </Example>
      <Api
        rows={[
          [
            "onSelect",
            "(value: string) => void",
            "Receives the value of the item picked by click, Enter, or Space. The menu closes after a pick.",
          ],
          [
            "open / defaultOpen / onOpenChange",
            "boolean",
            "open is controlled. defaultOpen sets the initial state for uncontrolled use. onOpenChange reports visibility changes.",
          ],
          [
            "placement",
            "top | bottom, with -start and -end",
            "The side of the trigger the popup prefers. Defaults to bottom-start; it flips when there is no room.",
          ],
          [
            "MenuTrigger",
            "Button",
            "Takes the Button variant and size. Give an icon-only trigger an aria-label.",
          ],
          [
            "MenuItem",
            "value, disabled, variant",
            'value is passed to onSelect. variant="danger" marks a destructive item. Typeahead matches the item text.',
          ],
          [
            "MenuPortal",
            "mount?: Node",
            "Renders the popup under document.body, or under mount — pass a dialog element to keep the menu interactive inside a native modal.",
          ],
          [
            "Styles",
            "@simple-base/css/menu",
            "Included in the main stylesheet. The .sb-menu-content classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
