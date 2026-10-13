import type { ListboxOption, ListboxOptions } from "./listbox";

export type SelectOption = ListboxOption;

export type SelectOptions = ListboxOptions;

export const selectDefaults = {
  placement: "bottom-start",
} as const satisfies Required<Pick<SelectOptions, "placement">>;
