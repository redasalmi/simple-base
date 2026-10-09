import type { TooltipOptions } from "@simple-base/contracts";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import * as tooltip from "@zag-js/tooltip";
import {
  type Accessor,
  createContext,
  createMemo,
  createUniqueId,
  type JSX,
  splitProps,
  useContext,
} from "solid-js";
import { Portal } from "solid-js/web";

import { cn } from "../cn";
import { Button, type ButtonProps } from "./Button";

type TooltipContextType = {
  api: Accessor<tooltip.Api>;
};

const TooltipContext = createContext<TooltipContextType | null>(null);

function useTooltip() {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("Tooltip parts must be used within a Tooltip");

  return context;
}

export type TooltipRootProps = TooltipOptions & {
  children: JSX.Element;
};

export function Tooltip(props: TooltipRootProps) {
  const positioning = createMemo(() =>
    props.placement ? { placement: props.placement } : undefined,
  );

  const fallbackId = createUniqueId();

  const service = useMachine(tooltip.machine, {
    get id() {
      return props.id ?? fallbackId;
    },
    get open() {
      return props.open;
    },
    get defaultOpen() {
      return props.defaultOpen;
    },
    get positioning() {
      return positioning();
    },
    onOpenChange({ open }) {
      props.onOpenChange?.(open);
    },
  });

  const api = createMemo(() => tooltip.connect(service, normalizeProps));

  return <TooltipContext.Provider value={{ api }}>{props.children}</TooltipContext.Provider>;
}

export type TooltipTriggerProps = Omit<ButtonProps, "id" | "aria-describedby">;

export function TooltipTrigger(props: TooltipTriggerProps) {
  const { api } = useTooltip();
  const [local, rest] = splitProps(props, ["class", "variant", "size", "children"]);

  return (
    <Button
      type="button"
      {...mergeProps(api().getTriggerProps(), rest)}
      class={cn("sb-tooltip-trigger", local.class)}
      variant={local.variant}
      size={local.size}
    >
      {local.children}
    </Button>
  );
}

export type TooltipPortalProps = {
  children: JSX.Element;
  mount?: Node;
};

export function TooltipPortal(props: TooltipPortalProps) {
  return <Portal mount={props.mount}>{props.children}</Portal>;
}

export type TooltipPositionerProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "style">;

export function TooltipPositioner(props: TooltipPositionerProps) {
  const { api } = useTooltip();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getPositionerProps(), rest)}
      class={cn("sb-tooltip-positioner", local.class)}
    >
      {local.children}
    </div>
  );
}

export type TooltipContentProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "id" | "role" | "hidden"
>;

export function TooltipContent(props: TooltipContentProps) {
  const { api } = useTooltip();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getContentProps(), rest)}
      class={cn("sb-tooltip-content", local.class)}
    >
      {local.children}
    </div>
  );
}

export type TooltipArrowProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "id" | "style" | "children"
>;

export function TooltipArrow(props: TooltipArrowProps) {
  const { api } = useTooltip();
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div {...mergeProps(api().getArrowProps(), rest)} class={cn("sb-tooltip-arrow", local.class)}>
      <div {...api().getArrowTipProps()} class="sb-tooltip-arrow-tip" />
    </div>
  );
}
