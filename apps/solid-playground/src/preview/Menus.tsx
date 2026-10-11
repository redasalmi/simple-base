import { Api, Example } from "./Preview";

export function Menus() {
  return (
    <>
      <Example
        title="Row actions"
        description="Open a menu with Enter, Space, the arrow keys, or a click, then move with the arrow keys, Home, and End. Type a letter to jump to a matching item. Escape or Tab closes the menu and returns focus to the trigger."
        example="menu/RowActions"
      />
      <Example
        title="Groups, shortcuts, and disabled items"
        description="MenuGroup names a set of items with its MenuGroupLabel. Shortcuts are display text; binding the keys stays in your app. Disabled items stay in the list but are skipped by the arrow keys."
        example="menu/Groups"
      />
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
