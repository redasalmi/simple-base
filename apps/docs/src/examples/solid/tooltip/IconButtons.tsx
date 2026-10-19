import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@simple-base/solid";
import { For, type JSX } from "solid-js";

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

export default function IconButtons() {
  return (
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
  );
}
