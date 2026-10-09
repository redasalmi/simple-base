import {
  createContext,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
  Show,
  splitProps,
  useContext,
  type Accessor,
  type JSX,
} from "solid-js";
import { cn } from "../cn";
import type { FieldsetOptions } from "@simple-base/contracts";

type FieldsetContextType = {
  descriptionId: Accessor<string>;
  errorId: Accessor<string>;
  required: Accessor<boolean>;
  invalid: Accessor<boolean>;
  registerDescription: () => void;
  registerError: () => void;
};

const FieldsetContext = createContext<FieldsetContextType | null>(null);

export function useFieldset() {
  const context = useContext(FieldsetContext);
  if (!context) throw new Error("Fieldset parts must be used within a Fieldset");

  return context;
}

export type FieldsetRootProps = FieldsetOptions & {
  children: JSX.Element;
} & Omit<
    JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    keyof FieldsetOptions | "children" | "aria-describedby"
  >;

export function Fieldset(props: FieldsetRootProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "children",
    "id",
    "required",
    "disabled",
    "invalid",
  ]);
  const fallbackId = createUniqueId();
  const [hasDescription, setHasDescription] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);

  const id = () => local.id ?? fallbackId;
  const descriptionId = () => `${id()}-description`;
  const errorId = () => `${id()}-error`;
  const required = () => local.required ?? false;
  const invalid = () => local.invalid ?? false;

  const describedBy = () => {
    const ids = [];
    if (hasDescription()) ids.push(descriptionId());
    if (hasError() && invalid()) ids.push(errorId());

    return ids.length > 0 ? ids.join(" ") : undefined;
  };

  const context = {
    descriptionId,
    errorId,
    required,
    invalid,
    registerDescription() {
      onMount(() => setHasDescription(true));
      onCleanup(() => setHasDescription(false));
    },
    registerError() {
      onMount(() => setHasError(true));
      onCleanup(() => setHasError(false));
    },
  } satisfies FieldsetContextType;

  return (
    <FieldsetContext.Provider value={context}>
      <fieldset
        {...rest}
        id={id()}
        class={cn("sb-fieldset", local.class)}
        disabled={local.disabled}
        aria-describedby={describedBy()}
        data-invalid={invalid() ? "" : undefined}
      >
        {local.children}
      </fieldset>
    </FieldsetContext.Provider>
  );
}

export type FieldsetLegendProps = JSX.HTMLAttributes<HTMLLegendElement>;

export function FieldsetLegend(props: FieldsetLegendProps) {
  const { required } = useFieldset();
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <legend
      {...rest}
      class={cn("sb-field-title", local.class)}
      data-required={required() ? "" : undefined}
    />
  );
}

export type FieldsetDescriptionProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function FieldsetDescription(props: FieldsetDescriptionProps) {
  const { descriptionId, registerDescription } = useFieldset();
  const [local, rest] = splitProps(props, ["class"]);

  registerDescription();

  return <p {...rest} class={cn("sb-field-description", local.class)} id={descriptionId()} />;
}

export type FieldsetErrorProps = Omit<JSX.HTMLAttributes<HTMLParagraphElement>, "id">;

export function FieldsetError(props: FieldsetErrorProps) {
  const { errorId, invalid, registerError } = useFieldset();
  const [local, rest] = splitProps(props, ["class"]);

  registerError();

  return (
    <Show when={invalid()}>
      <p {...rest} class={cn("sb-field-error", local.class)} id={errorId()} />
    </Show>
  );
}
