import type { MenuItemOptions, MenuOptions } from "@simple-base/contracts";
import * as menu from "@zag-js/menu";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid";
import { type Accessor, createMemo, createUniqueId, type JSX, splitProps } from "solid-js";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import { createPositioning, PopupPortal, type PopupPortalProps } from "../internal/popup";
import { Button, type ButtonProps } from "./Button";

export type { MenuItemVariant } from "@simple-base/contracts";

type MenuContextType = {
  api: Accessor<menu.Api>;
};

const [MenuProvider, useMenu] = createRequiredContext<MenuContextType>("Menu");

const [MenuGroupProvider, useMenuGroup] = createRequiredContext<string>("MenuGroup");

export type MenuRootProps = MenuOptions & {
  children: JSX.Element;
};

export function Menu(props: MenuRootProps) {
  const positioning = createPositioning(() => props.placement);

  const fallbackId = createUniqueId();

  const service = useMachine(menu.machine, {
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
    onSelect({ value }) {
      props.onSelect?.(value);
    },
  });

  const api = createMemo(() => menu.connect(service, normalizeProps));

  return <MenuProvider value={{ api }}>{props.children}</MenuProvider>;
}

export type MenuTriggerProps = Omit<
  ButtonProps,
  "id" | "type" | "aria-controls" | "aria-expanded" | "aria-haspopup"
>;

export function MenuTrigger(props: MenuTriggerProps) {
  const { api } = useMenu();
  const [local, rest] = splitProps(props, ["class", "variant", "size", "children"]);

  return (
    <Button
      {...mergeProps(api().getTriggerProps(), rest)}
      class={cn("sb-menu-trigger", local.class)}
      variant={local.variant}
      size={local.size}
    >
      {local.children}
    </Button>
  );
}

export type MenuPortalProps = PopupPortalProps;

export const MenuPortal = PopupPortal;

export type MenuPositionerProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "style">;

export function MenuPositioner(props: MenuPositionerProps) {
  const { api } = useMenu();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      {...mergeProps(api().getPositionerProps(), rest)}
      class={cn("sb-menu-positioner", local.class)}
    >
      {local.children}
    </div>
  );
}

export type MenuContentProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "id" | "role" | "hidden" | "tabIndex"
>;

export function MenuContent(props: MenuContentProps) {
  const { api } = useMenu();
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div {...mergeProps(api().getContentProps(), rest)} class={cn("sb-menu-content", local.class)}>
      {local.children}
    </div>
  );
}

export type MenuItemProps = MenuItemOptions &
  Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof MenuItemOptions | "id" | "role">;

export function MenuItem(props: MenuItemProps) {
  const { api } = useMenu();
  const [local, rest] = splitProps(props, ["class", "value", "disabled", "variant", "children"]);

  return (
    <div
      {...mergeProps(api().getItemProps({ value: local.value, disabled: local.disabled }), rest)}
      class={cn("sb-menu-item", local.class)}
      data-variant={local.variant}
    >
      {local.children}
    </div>
  );
}

export type MenuItemShortcutProps = JSX.HTMLAttributes<HTMLSpanElement>;

export function MenuItemShortcut(props: MenuItemShortcutProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <span {...rest} class={cn("sb-menu-item-shortcut", local.class)} />;
}

export type MenuGroupProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id" | "role">;

export function MenuGroup(props: MenuGroupProps) {
  const { api } = useMenu();
  const [local, rest] = splitProps(props, ["children"]);
  const id = createUniqueId();

  return (
    <MenuGroupProvider value={id}>
      <div {...mergeProps(api().getItemGroupProps({ id }), rest)}>{local.children}</div>
    </MenuGroupProvider>
  );
}

export type MenuGroupLabelProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "id">;

export function MenuGroupLabel(props: MenuGroupLabelProps) {
  const { api } = useMenu();
  const groupId = useMenuGroup();
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      {...mergeProps(api().getItemGroupLabelProps({ htmlFor: groupId }), rest)}
      class={cn("sb-menu-group-label", local.class)}
    />
  );
}

export type MenuSeparatorProps = Omit<JSX.HTMLAttributes<HTMLHRElement>, "role">;

export function MenuSeparator(props: MenuSeparatorProps) {
  const { api } = useMenu();
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <hr
      {...mergeProps(api().getSeparatorProps(), rest)}
      class={cn("sb-menu-separator", local.class)}
    />
  );
}
