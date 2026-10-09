import { For, type JSX } from "solid-js";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@simple-base/solid";
import { Api, Example } from "./Preview";

function Icon(props: { children: JSX.Element }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {props.children}
    </svg>
  );
}

const actions = [
  {
    label: "Download PDF",
    icon: () => (
      <Icon>
        <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
      </Icon>
    ),
  },
  {
    label: "Duplicate",
    icon: () => (
      <Icon>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </Icon>
    ),
  },
  {
    label: "Send by email",
    icon: () => (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </Icon>
    ),
  },
];

export function Tooltips() {
  return (
    <>
      <Example
        title="Name icon-only buttons"
        description="Hover a button, or move focus to it with Tab, to show its tooltip. The tooltip repeats the button's aria-label for sighted users; Escape, a click, or moving away hides it. After the first tooltip opens, moving to the next button shows its tooltip at once."
        code={
          '<Tooltip>\n  <TooltipTrigger variant="ghost" aria-label="Download PDF">\n    <DownloadIcon />\n  </TooltipTrigger>\n  <TooltipPortal>\n    <TooltipPositioner>\n      <TooltipContent>\n        <TooltipArrow />\n        Download PDF\n      </TooltipContent>\n    </TooltipPositioner>\n  </TooltipPortal>\n</Tooltip>'
        }
      >
        <div class="preview-row">
          <For each={actions}>
            {(action) => (
              <Tooltip>
                <TooltipTrigger variant="ghost" aria-label={action.label}>
                  {action.icon()}
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipPositioner>
                    <TooltipContent>
                      <TooltipArrow />
                      {action.label}
                    </TooltipContent>
                  </TooltipPositioner>
                </TooltipPortal>
              </Tooltip>
            )}
          </For>
        </div>
      </Example>
      <Example
        title="Placement and shortcuts"
        description="placement picks the preferred side; the tooltip flips when there is no room. A keyboard shortcut inside the content takes the inverse tooltip colors. Binding the key stays in your app."
        code={
          '<Tooltip placement="top">\n  <TooltipTrigger variant="secondary">Save draft</TooltipTrigger>\n  <TooltipPortal>\n    <TooltipPositioner>\n      <TooltipContent>\n        <TooltipArrow />\n        Save without sending <kbd class="sb-shortcut">S</kbd>\n      </TooltipContent>\n    </TooltipPositioner>\n  </TooltipPortal>\n</Tooltip>'
        }
      >
        <div class="preview-row">
          <Tooltip placement="top">
            <TooltipTrigger variant="secondary">Save draft</TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner>
                <TooltipContent>
                  <TooltipArrow />
                  Save without sending <kbd class="sb-shortcut">S</kbd>
                </TooltipContent>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
          <Tooltip placement="bottom-start">
            <TooltipTrigger variant="secondary">Bottom start</TooltipTrigger>
            <TooltipPortal>
              <TooltipPositioner>
                <TooltipContent>
                  <TooltipArrow />
                  Aligned to the start of the trigger
                </TooltipContent>
              </TooltipPositioner>
            </TooltipPortal>
          </Tooltip>
        </div>
      </Example>
      <Api
        rows={[
          [
            "open / defaultOpen / onOpenChange",
            "boolean",
            "open is controlled. defaultOpen sets the initial state for uncontrolled use. onOpenChange reports visibility changes.",
          ],
          [
            "placement",
            "top | bottom, with -start and -end",
            "The side of the trigger the tooltip prefers. Defaults to bottom; it flips when there is no room.",
          ],
          [
            "TooltipTrigger",
            "Button",
            "Takes the Button variant and size, and defaults to type=button. The tooltip describes the trigger only while open, so give an icon-only trigger an aria-label too.",
          ],
          [
            "TooltipContent",
            "div",
            "Shows after a short hover delay, or at once on keyboard focus. It is not interactive: keep it to a short label, with no links or buttons.",
          ],
          [
            "TooltipArrow",
            "div",
            "Optional. Place it first inside TooltipContent; it points at the trigger from whichever side the tooltip lands on.",
          ],
          [
            "TooltipPortal",
            "mount?: Node",
            "Renders the tooltip under document.body, or under mount — pass a dialog element to show it above a native modal.",
          ],
          [
            "Styles",
            "@simple-base/css/tooltip",
            "Included in the main stylesheet. The .sb-tooltip-content classes stay available for plain HTML.",
          ],
        ]}
      />
    </>
  );
}
