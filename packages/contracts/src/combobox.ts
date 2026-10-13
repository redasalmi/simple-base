import type { ListboxOption, ListboxOptions } from "./listbox";

export type ComboboxOption = ListboxOption;

export type ComboboxOptions = ListboxOptions;

export const comboboxDefaults = {
  placement: "bottom-start",
} as const satisfies Required<Pick<ComboboxOptions, "placement">>;
