import {
  createMemo,
  useContext,
  createSignal,
  For,
  Show,
  createContext,
  type JSX,
  type Accessor,
} from "solid-js";
import { Portal } from "solid-js/web";
import * as combobox from "@zag-js/combobox";
import { normalizeProps, useMachine } from "@zag-js/solid";
import type { ComboboxOption, ComboboxOptions } from "@simple-base/contracts";

type ComboboxContextType = {
  label: Accessor<string>;
  options: Accessor<ComboboxOption[]>;
  api: Accessor<combobox.Api>;
};

const ComboboxContext = createContext<ComboboxContextType | null>(null);

function useCombobox() {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error("useCombobox must be used within a Combobox");

  return context;
}

export type ComboboxRootProps = ComboboxOptions & {
  children: JSX.Element;
};

function ComboboxRoot(props: ComboboxRootProps) {
  const [query, setQuery] = createSignal("");
  const options = createMemo(() => {
    const search = query().toLowerCase();
    return props.options.filter((option) => option.label.toLowerCase().includes(search));
  });

  const collection = createMemo(() =>
    combobox.collection({
      items: options(),
      itemToValue: (item) => item.value,
      itemToString: (item) => item.label,
      isItemDisabled: (item) => item.disabled ?? false,
    }),
  );

  const service = useMachine(combobox.machine, {
    get id() {
      return props.id;
    },
    get ids() {
      return { root: props.id };
    },
    get placeholder() {
      return props.placeholder;
    },
    get collection() {
      return collection();
    },
    onOpenChange({ open, reason }) {
      if (open && reason !== "input-change") setQuery("");
    },
    onInputValueChange({ inputValue, reason }) {
      setQuery(reason === "input-change" ? inputValue : "");
    },
    onValueChange({ value }) {
      props.onValueChange(value[0] ?? "");
    },
  });

  const api = createMemo(() => combobox.connect(service, normalizeProps));

  return (
    <ComboboxContext.Provider
      value={{
        label: () => props.label,
        options,
        api,
      }}
    >
      <div {...api().getRootProps()} class="sb-combobox">
        {props.children}
      </div>
    </ComboboxContext.Provider>
  );
}

type ComboboxLabelProps = {
  children?: JSX.Element;
};

function ComboboxLabel(props: ComboboxLabelProps) {
  const { api, label } = useCombobox();

  return (
    <label {...api().getLabelProps()} class="sb-combobox-label">
      {props.children ?? label()}
    </label>
  );
}

type ComboboxTriggerProps = {
  children: JSX.Element;
};

function ComboboxTrigger(props: ComboboxTriggerProps) {
  const { api } = useCombobox();

  return (
    <button {...api().getTriggerProps()} class="sb-combobox-trigger">
      {props.children}
    </button>
  );
}

type ComboboxControlProps = {
  children: JSX.Element;
};

function ComboboxControl(props: ComboboxControlProps) {
  const { api } = useCombobox();

  return (
    <div {...api().getControlProps()} class="sb-combobox-control">
      {props.children}
    </div>
  );
}

function ComboboxInput() {
  const { api, label } = useCombobox();

  return <input {...api().getInputProps()} aria-label={label()} class="sb-combobox-input" />;
}

type ComboboxPortalProps = {
  children: JSX.Element;
};

function ComboboxPortal(props: ComboboxPortalProps) {
  return <Portal>{props.children}</Portal>;
}

type ComboboxPositionerProps = {
  children: JSX.Element;
};

function ComboboxPositioner(props: ComboboxPositionerProps) {
  const { api } = useCombobox();

  return (
    <div {...api().getPositionerProps()} class="sb-combobox-positioner">
      {props.children}
    </div>
  );
}

type ComboboxContentProps = {
  children: JSX.Element;
};

function ComboboxContent(props: ComboboxContentProps) {
  const { api } = useCombobox();

  return (
    <div hidden={!api().open} class="sb-combobox-content">
      {props.children}
    </div>
  );
}

type ComboboxListProps = {
  children: (option: ComboboxOption) => JSX.Element;
};

function ComboboxList(props: ComboboxListProps) {
  const { api, options, label } = useCombobox();

  return (
    <ul {...api().getContentProps()} aria-label={label()} class="sb-combobox-list">
      <For each={options()}>{(option) => props.children(option)}</For>
    </ul>
  );
}

type ComboboxEmptyProps = {
  children: JSX.Element;
};

function ComboboxEmpty(props: ComboboxEmptyProps) {
  const { api, options } = useCombobox();

  return (
    <Show when={api().open && options().length === 0}>
      <div role="status" class="sb-combobox-empty">
        {props.children}
      </div>
    </Show>
  );
}

type ComboboxItemProps = {
  option: ComboboxOption;
};

function ComboboxItem(props: ComboboxItemProps) {
  const { api } = useCombobox();

  return (
    <li {...api().getItemProps({ item: props.option })} class="sb-combobox-item">
      {props.option.label}
    </li>
  );
}

export const Combobox = Object.assign(ComboboxRoot, {
  Root: ComboboxRoot,
  Label: ComboboxLabel,
  Control: ComboboxControl,
  Input: ComboboxInput,
  Trigger: ComboboxTrigger,
  Portal: ComboboxPortal,
  Positioner: ComboboxPositioner,
  Content: ComboboxContent,
  List: ComboboxList,
  Empty: ComboboxEmpty,
  Item: ComboboxItem,
});
