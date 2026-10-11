import { createSignal, For } from "solid-js";

export default function CommandPopover() {
  const [menuAction, setMenuAction] = createSignal("Choose an example command.");
  let menu: HTMLDetailsElement | undefined;

  return (
    <div class="preview-stack">
      <div class="preview-demo-menu">
        {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- handles Escape from the summary and buttons inside */}
        <details
          ref={(element) => {
            menu = element;
          }}
          class="sb-menu"
          onKeyDown={(event) => {
            if (event.key === "Escape" && menu) {
              menu.open = false;
              menu.querySelector("summary")?.focus();
            }
          }}
        >
          <summary class="sb-button" data-variant="secondary">
            Example commands
          </summary>
          <div class="sb-menu-panel">
            <div class="sb-menu-group-label">Invoice</div>
            <For each={["Rename", "Duplicate", "Archive"]}>
              {(command) => (
                <button
                  class="sb-menu-item"
                  onClick={() => {
                    setMenuAction(`${command} selected. No record was changed.`);
                    if (menu) {
                      menu.open = false;
                      menu.querySelector("summary")?.focus();
                    }
                  }}
                >
                  {command}
                  <span class="sb-menu-item-shortcut">{command[0]}</span>
                </button>
              )}
            </For>
            <hr class="sb-menu-separator" />
            <button
              class="sb-menu-item"
              data-variant="danger"
              onClick={() => {
                setMenuAction("Delete selected. No record was changed.");
                if (menu) {
                  menu.open = false;
                  menu.querySelector("summary")?.focus();
                }
              }}
            >
              Delete
            </button>
          </div>
        </details>
      </div>
      <p class="preview-status" role="status">
        {menuAction()}
      </p>
    </div>
  );
}
