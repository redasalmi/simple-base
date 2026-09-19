type WidgetName = "Select" | "Combobox";

type WidgetOption = {
  value: string;
};

export function validateWidgetOptions(widget: WidgetName, options: readonly WidgetOption[]): void {
  const values = new Set<string>();

  for (const option of options) {
    if (option.value === "") {
      throw new Error(
        `[simple-base] ${widget} option values must be non-empty. Empty string is reserved for no selection.`,
      );
    }

    if (values.has(option.value)) {
      throw new Error(
        `[simple-base] ${widget} option values must be unique. Duplicate value: ${JSON.stringify(option.value)}.`,
      );
    }

    values.add(option.value);
  }
}
