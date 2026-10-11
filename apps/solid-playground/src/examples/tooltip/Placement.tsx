import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@simple-base/solid";

export default function Placement() {
  return (
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
  );
}
