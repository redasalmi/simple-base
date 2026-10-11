import { Checkbox } from "@simple-base/solid";
import { createSignal, For } from "solid-js";

const exportTypes = ["Invoices", "Receipts", "Credit notes"];

export default function SelectAll() {
  const [exported, setExported] = createSignal(["Invoices"]);
  const allExported = () => exported().length === exportTypes.length;

  return (
    <fieldset class="sb-fieldset preview-stack">
      <legend class="sb-heading-5">Export</legend>
      <label class="preview-choice">
        <Checkbox
          checked={allExported()}
          indeterminate={exported().length > 0 && !allExported()}
          onChange={(event) => setExported(event.currentTarget.checked ? exportTypes : [])}
        />
        <span>All documents</span>
      </label>
      <For each={exportTypes}>
        {(type) => (
          <label class="preview-choice" style={{ "padding-inline-start": "32px" }}>
            <Checkbox
              checked={exported().includes(type)}
              onChange={(event) =>
                setExported((types) =>
                  event.currentTarget.checked
                    ? exportTypes.filter((t) => t === type || types.includes(t))
                    : types.filter((t) => t !== type),
                )
              }
            />
            <span>{type}</span>
          </label>
        )}
      </For>
    </fieldset>
  );
}
