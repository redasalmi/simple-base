import { createSignal, For } from "solid-js";

export default function SegmentedControl() {
  const [view, setView] = createSignal("List");

  return (
    <div class="preview-stack">
      <div>
        <div class="sb-segmented" role="group" aria-label="Example view">
          <For each={["List", "Board", "Timeline"]}>
            {(item) => (
              <button
                class="sb-segment"
                aria-pressed={view() === item}
                onClick={() => setView(item)}
              >
                {item}
              </button>
            )}
          </For>
        </div>
      </div>
      <p class="preview-status" role="status">
        Selected view: {view()}.
      </p>
    </div>
  );
}
