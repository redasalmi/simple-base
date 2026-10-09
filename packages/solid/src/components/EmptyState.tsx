import { type JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { cn } from "../cn";

export type EmptyStateRootProps = JSX.HTMLAttributes<HTMLDivElement>;

export function EmptyState(props: EmptyStateRootProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-empty-state", local.class)} />;
}

export type EmptyStateMarkProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, "aria-hidden">;

export function EmptyStateMark(props: EmptyStateMarkProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <span {...rest} aria-hidden="true" class={cn("sb-empty-state-mark", local.class)} />;
}

export type EmptyStateTitleProps = JSX.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export function EmptyStateTitle(props: EmptyStateTitleProps) {
  const [local, rest] = splitProps(props, ["class", "level"]);

  return (
    <Dynamic
      {...rest}
      component={`h${local.level ?? 2}`}
      class={cn("sb-empty-state-title", local.class)}
    />
  );
}

export type EmptyStateDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>;

export function EmptyStateDescription(props: EmptyStateDescriptionProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <p {...rest} class={cn("sb-empty-state-description", local.class)} />;
}

export type EmptyStateActionsProps = JSX.HTMLAttributes<HTMLDivElement>;

export function EmptyStateActions(props: EmptyStateActionsProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-empty-state-actions", local.class)} />;
}
