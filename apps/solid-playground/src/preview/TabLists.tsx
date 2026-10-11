import { Api, Example } from "./Preview";

export function TabLists() {
  return (
    <>
      <Example
        title="Status filters"
        description="Arrow keys move between tabs and select them as they go; Home and End jump to the ends, and Tab moves into the selected panel. value and onValueChange keep the selected filter in your state; filtering the rows stays in your app."
        example="tabs/StatusFilters"
      />
      <Example
        title="Settings sections"
        description="defaultValue picks the first section without any state. A disabled tab stays visible but is skipped by the arrow keys and cannot be selected."
        example="tabs/Settings"
      />
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
