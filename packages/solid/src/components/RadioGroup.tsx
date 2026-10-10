import type { RadioGroupOptions } from "@simple-base/contracts";
import { type Accessor, createUniqueId, type JSX, splitProps } from "solid-js";

import { cn } from "../cn";
import { createRequiredContext } from "../internal/context";
import { useFieldset } from "../internal/fieldset";
import { ariaInvalid, composeHandler, mergeRefs, type WithoutOwnedProps } from "../internal/props";
import { Radio, type RadioProps } from "./Radio";

type RadioGroupContextType = {
  name: Accessor<string>;
  value: Accessor<string | undefined>;
  defaultValue: Accessor<string | undefined>;
  select: (value: string) => void;
};

const [RadioGroupProvider, useRadioGroup] =
  createRequiredContext<RadioGroupContextType>("RadioGroup");

export type RadioGroupRootProps = RadioGroupOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof RadioGroupOptions | "children">;

export function RadioGroup(props: RadioGroupRootProps) {
  useFieldset();
  const [local, rest] = splitProps(props, [
    "ref",
    "class",
    "children",
    "name",
    "value",
    "defaultValue",
    "onValueChange",
  ]);
  const fallbackName = createUniqueId();
  let list: HTMLDivElement | undefined;

  const context = {
    name: () => local.name ?? fallbackName,
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    select(value) {
      local.onValueChange?.(value);
      // The browser checks the radio before the parent responds; if the parent kept its value, Solid has nothing to write back.
      if (!list || local.value === undefined) return;
      const radios = list.querySelectorAll<HTMLInputElement>('input[type="radio"]');
      for (const radio of Array.from(radios)) radio.checked = radio.value === local.value;
    },
  } satisfies RadioGroupContextType;

  return (
    <RadioGroupProvider value={context}>
      <div
        {...rest}
        class={cn("sb-choice-list", local.class)}
        ref={mergeRefs((element: HTMLDivElement) => (list = element), local.ref)}
      >
        {local.children}
      </div>
    </RadioGroupProvider>
  );
}

type RadioGroupOwnedProps = "name" | "checked" | "defaultChecked" | "required" | "aria-invalid";

export type RadioGroupItemProps = WithoutOwnedProps<
  Omit<RadioProps, "value" | "children">,
  RadioGroupOwnedProps
> & {
  value: string;
  /** The option's label, rendered beside the radio. */
  children?: JSX.Element;
};

export function RadioGroupItem(props: RadioGroupItemProps) {
  const fieldset = useFieldset();
  const group = useRadioGroup();
  const [local, rest] = splitProps(props, ["class", "children", "value", "onChange"]);

  return (
    <label class={cn("sb-choice", local.class)}>
      <Radio
        {...rest}
        onChange={composeHandler(
          () => local.onChange,
          () => group.select(local.value),
        )}
        name={group.name()}
        value={local.value}
        checked={group.value() === undefined ? undefined : group.value() === local.value}
        defaultChecked={group.defaultValue() === local.value}
        required={fieldset.required()}
        aria-invalid={ariaInvalid(fieldset.invalid())}
      />
      <span>{local.children}</span>
    </label>
  );
}
