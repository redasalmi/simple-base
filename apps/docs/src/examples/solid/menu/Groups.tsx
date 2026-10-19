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
} from "@simple-base/solid";
import { createSignal } from "solid-js";

import { ChevronDownIcon } from "../icons";

const actionLabels: Record<string, string> = {
  edit: "Edit",
  duplicate: "Duplicate",
  remind: "Send reminder",
  archive: "Archive",
  delete: "Delete",
};

export default function Groups() {
  const [command, setCommand] = createSignal("Open the menu to pick a command.");

  return (
    <div class="preview-stack">
      <div>
        <Menu
          onSelect={(action) =>
            setCommand(`${actionLabels[action]} selected. No record was changed.`)
          }
        >
          <MenuTrigger variant="secondary">
            Commands
            <ChevronDownIcon />
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
  );
}
