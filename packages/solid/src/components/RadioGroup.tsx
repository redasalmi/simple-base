import {
  createContext,
  createUniqueId,
  splitProps,
  useContext,
  type Accessor,
  type JSX,
} from "solid-js";
import { mergeProps } from "@zag-js/solid";
import { cn } from "../cn";
import type { RadioGroupOptions } from "@simple-base/contracts";
import { useFieldset } from "./Fieldset";
import { Radio, type RadioProps } from "./Radio";

type RadioGroupContextType = {
  name: Accessor<string>;
  value: Accessor<string | undefined>;
  defaultValue: Accessor<string | undefined>;
  select: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

function useRadioGroup() {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error("RadioGroupItem must be used within a RadioGroup");

  return context;
}

export type RadioGroupRootProps = RadioGroupOptions & {
  children: JSX.Element;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, keyof RadioGroupOptions | "children">;

export function RadioGroup(props: RadioGroupRootProps) {
  useFieldset();
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "name",
    "value",
    "defaultValue",
    "onValueChange",
  ]);
  const fallbackName = createUniqueId();

  const context = {
    name: () => local.name ?? fallbackName,
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    select: (value) => local.onValueChange?.(value),
  } satisfies RadioGroupContextType;

  return (
    <RadioGroupContext.Provider value={context}>
      <div {...rest} class={cn("sb-choice-list", local.class)}>
        {local.children}
      </div>
    </RadioGroupContext.Provider>
  );
}

type RadioGroupOwnedProps = "name" | "checked" | "defaultChecked" | "required" | "aria-invalid";

// JSX accepts any hyphenated attribute that a type omits, so aria-* must be typed as never to be rejected.
export type RadioGroupItemProps = Omit<RadioProps, RadioGroupOwnedProps | "value" | "children"> & {
  [Key in RadioGroupOwnedProps]?: never;
} & {
  value: string;
  /** The option's label, rendered beside the radio. */
  children?: JSX.Element;
};

export function RadioGroupItem(props: RadioGroupItemProps) {
  const fieldset = useFieldset();
  const group = useRadioGroup();
  const [local, rest] = splitProps(props, ["class", "children", "value"]);
  const selection = {
    onChange: () => group.select(local.value),
  };

  return (
    <label class={cn("sb-choice", local.class)}>
      <Radio
        {...mergeProps(selection, rest)}
        name={group.name()}
        value={local.value}
        checked={group.value() === undefined ? undefined : group.value() === local.value}
        defaultChecked={group.defaultValue() === local.value}
        required={fieldset.required()}
        aria-invalid={fieldset.invalid() || undefined}
      />
      <span>{local.children}</span>
    </label>
  );
}
