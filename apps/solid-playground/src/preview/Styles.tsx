import { For, Show, createSignal } from "solid-js";
import { Button, Checkbox } from "@simple-base/solid";
import { Api, Example, Field } from "./Preview";

export function Styles() {
  const [progress, setProgress] = createSignal(64);
  const [view, setView] = createSignal("List");
  const [tab, setTab] = createSignal(0);
  const [page, setPage] = createSignal(1);
  const [selected, setSelected] = createSignal<string[]>([]);
  const [menuAction, setMenuAction] = createSignal("Choose an example command.");
  const [toast, setToast] = createSignal(false);
  const [hasRecord, setHasRecord] = createSignal(false);
  let menu: HTMLDetailsElement | undefined;
  const tabNames = ["Overview", "Activity", "Settings"];
  const cardTreatments = [
    [undefined, "Default"],
    ["flat", "Flat"],
    ["rule", "Rule"],
  ] as const;
  const tabCopy = [
    "A summary of the example workspace.",
    "There is no recent activity in this demo.",
    "Workspace settings are managed locally in this preview.",
  ];
  const records = () => [
    { id: `DOC-${page() * 2 - 1}`, name: `Document ${page() * 2 - 1}`, status: "Published" },
    { id: `DOC-${page() * 2}`, name: `Document ${page() * 2}`, status: "Draft" },
  ];

  return (
    <>
      <Example
        title="Cards & grouping"
        description="Default, flat, and rule variants. Surfaces and borders provide grouping; cards have no default elevation and ship their own interior padding."
        code={
          '<section class="sb-card" data-variant="rule">\n  <h3 class="sb-heading-3">Workspace settings</h3>\n</section>'
        }
      >
        <div class="preview-stack">
          <For each={cardTreatments}>
            {([variant, label]) => (
              <section class="sb-card" data-variant={variant}>
                <h3 class="sb-heading-4">{label}</h3>
                <p class="sb-text-body">A group of related content, not an action.</p>
              </section>
            )}
          </For>
        </div>
      </Example>
      <Example
        title="Status & alerts"
        description="Status lines support success, danger, and info. Alerts support danger and info. Keep the message specific and include a recovery path when needed."
        code={
          '<div class="sb-status-line" data-status="success">\n  <span class="sb-status-dot" aria-hidden="true" />\n  <div><strong>Changes saved</strong><p>Your preferences are up to date.</p></div>\n</div>'
        }
      >
        <div class="preview-stack">
          <For
            each={[
              ["success", "Changes saved", "Your preferences are up to date."],
              ["danger", "Could not save", "Check your connection and try again."],
              ["info", "Read-only workspace", "Ask an owner for editing access."],
            ]}
          >
            {([status, title, copy]) => (
              <div class="sb-status-line" data-status={status}>
                <span class="sb-status-dot" aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </div>
            )}
          </For>
          <div class="sb-alert" data-status="danger">
            <span class="sb-alert-mark" aria-hidden="true">
              !
            </span>
            <div>
              <strong>Review your entries</strong>
              <p>A required field is missing.</p>
            </div>
          </div>
          <div class="sb-alert" data-status="info">
            <div>
              <strong>Scheduled maintenance</strong>
              <p>Editing will be unavailable during the maintenance window.</p>
            </div>
          </div>
          <div>
            <Button variant="secondary" onClick={() => setToast(true)}>
              Show success toast
            </Button>
          </div>
        </div>
      </Example>
      <div class="sb-live-region" role="status">
        <div class="sb-toast" data-status="success" hidden={!toast()}>
          <span class="sb-toast-icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <strong>Example saved</strong>
            <p>This notification stays until dismissed.</p>
            <Button size="small" variant="ghost" onClick={() => setToast(false)}>
              Dismiss notification
            </Button>
          </div>
        </div>
      </div>
      <Example
        title="Progress & range"
        description="A native range input drives the progress specimen. Values are local, not a running upload or a fabricated metric."
        code={
          '<input class="sb-range" type="range" min="0" max="100" />\n<div class="sb-progress" role="progressbar" aria-valuenow={value()}\n  aria-valuemin={0} aria-valuemax={100}\n  style={{ "--sb-progress-value": `${value()}%` }}>\n  <span />\n</div>'
        }
      >
        <div class="preview-stack">
          <Field label="Example completion">
            <input
              class="sb-range"
              type="range"
              min="0"
              max="100"
              value={progress()}
              onInput={(event) => setProgress(Number(event.currentTarget.value))}
            />
          </Field>
          <div class="sb-range-readout">
            <span>0%</span>
            <output>{progress()}%</output>
            <span>100%</span>
          </div>
          <div
            class="sb-progress"
            role="progressbar"
            aria-label="Example completion"
            aria-valuenow={progress()}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ "--sb-progress-value": `${progress()}%` }}
          >
            <span />
          </div>
        </div>
      </Example>
      <Example
        title="Select & choices"
        description="Native controls with CSS wrappers for the arrow and choice hit area. The field, fieldset, help, and choice classes are available independently."
        code={
          '<label class="sb-field">\n  <span class="sb-field-title">Delivery</span>\n  <span class="sb-select-wrap">\n    <select class="sb-select"><option>Daily summary</option></select>\n  </span>\n</label>'
        }
      >
        <div class="preview-stack">
          <div class="preview-fields">
            <Field label="Delivery">
              <span class="sb-select-wrap">
                <select class="sb-select">
                  <option>Daily summary</option>
                  <option>Weekly summary</option>
                  <option>Never</option>
                </select>
              </span>
            </Field>
            <Field label="Locked delivery">
              <span class="sb-select-wrap">
                <select class="sb-select" disabled>
                  <option>Managed by your team</option>
                </select>
              </span>
            </Field>
          </div>
          <fieldset class="sb-fieldset">
            <legend class="sb-field-title">Include in summary</legend>
            <div class="sb-choice-list">
              <label class="sb-choice">
                <Checkbox checked />
                <span>New documents</span>
              </label>
              <label class="sb-choice">
                <Checkbox />
                <span>Comments</span>
              </label>
            </div>
          </fieldset>
        </div>
      </Example>
      <Example
        title="Segmented control"
        description="A compact choice of view. This example changes only the selected state and its accompanying label."
        code={
          '<div class="sb-segmented" role="group" aria-label="View">\n  <button class="sb-segment" aria-pressed={view() === "List"}>List</button>\n  <button class="sb-segment" aria-pressed={view() === "Board"}>Board</button>\n</div>'
        }
      >
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
      </Example>
      <Example
        title="Tabs"
        description="Tabs reveal their associated content. Arrow keys, Home, and End move through the set; Tab proceeds into the selected panel."
        code={
          '<div class="sb-tabs" role="tablist" aria-label="Workspace">\n  <button class="sb-tab" role="tab" aria-selected="true"\n    id="overview-tab" aria-controls="overview">Overview</button>\n</div>\n<div class="sb-tab-panel" role="tabpanel" id="overview"\n  aria-labelledby="overview-tab">Workspace summary</div>'
        }
      >
        <div class="preview-tabs">
          <div
            class="sb-tabs"
            role="tablist"
            aria-label="Example workspace"
            onKeyDown={(event) => {
              let next = tab();
              if (event.key === "ArrowRight") next = (next + 1) % tabNames.length;
              else if (event.key === "ArrowLeft")
                next = (next + tabNames.length - 1) % tabNames.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = tabNames.length - 1;
              else return;
              event.preventDefault();
              setTab(next);
              document.getElementById(`pattern-tab-${next}`)?.focus();
            }}
          >
            <For each={tabNames}>
              {(name, index) => (
                <button
                  class="sb-tab"
                  role="tab"
                  id={`pattern-tab-${index()}`}
                  aria-controls={`pattern-panel-${index()}`}
                  aria-selected={tab() === index()}
                  tabIndex={tab() === index() ? 0 : -1}
                  onClick={() => setTab(index())}
                >
                  {name}
                </button>
              )}
            </For>
          </div>
          <For each={tabCopy}>
            {(copy, index) => (
              <div
                class="sb-tab-panel"
                role="tabpanel"
                id={`pattern-panel-${index()}`}
                aria-labelledby={`pattern-tab-${index()}`}
                hidden={tab() !== index()}
                tabIndex={0}
              >
                {copy}
              </div>
            )}
          </For>
        </div>
      </Example>
      <Example
        title="Table & pagination"
        description="A small fictional dataset. Select rows to inspect the selected style, or change pages. The table scrolls within its specimen on narrow screens."
        code={
          '<div class="sb-table-wrap">\n  <table class="sb-table">…</table>\n</div>\n<nav class="sb-pagination" aria-label="Pages">\n  <button class="sb-page-button" aria-current="page">1</button>\n</nav>'
        }
      >
        <div class="preview-stack">
          <div class="sb-table-wrap" role="region" aria-label="Example records" tabIndex={0}>
            <table class="sb-table">
              <caption class="sb-text-caption">Fictional documents · page {page()} of 3</caption>
              <thead>
                <tr>
                  <th scope="col">Select</th>
                  <th scope="col">ID</th>
                  <th scope="col">Document</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <For each={records()}>
                  {(record) => (
                    <tr aria-selected={selected().includes(record.id)}>
                      <td>
                        <Checkbox
                          aria-label={`Select ${record.name}`}
                          checked={selected().includes(record.id)}
                          onChange={(event) =>
                            setSelected((ids) =>
                              event.currentTarget.checked
                                ? [...ids, record.id]
                                : ids.filter((id) => id !== record.id),
                            )
                          }
                        />
                      </td>
                      <td data-variant="code">{record.id}</td>
                      <td>{record.name}</td>
                      <td>{record.status}</td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
          <nav class="sb-pagination" aria-label="Example record pages">
            <For each={[1, 2, 3]}>
              {(number) => (
                <button
                  class="sb-page-button"
                  aria-current={page() === number ? "page" : undefined}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              )}
            </For>
          </nav>
        </div>
      </Example>
      <Example
        title="Breadcrumb & disclosure"
        description="Breadcrumb links lead to real sections of this reference. The disclosure uses native details and summary behavior."
        code={
          '<nav class="sb-breadcrumb" aria-label="Breadcrumb">\n  <a href="#buttons">Components</a>\n  <span class="sb-breadcrumb-separator" aria-hidden="true">/</span>\n  <span aria-current="page">CSS patterns</span>\n</nav>\n<details class="sb-disclosure">\n  <summary>How do I load the styles?</summary>\n  <p class="sb-disclosure-copy">Import the CSS package once.</p>\n</details>'
        }
      >
        <div class="preview-stack">
          <nav class="sb-breadcrumb" aria-label="Example breadcrumb">
            <a href="#buttons">Components</a>
            <span class="sb-breadcrumb-separator" aria-hidden="true">
              /
            </span>
            <span aria-current="page">CSS patterns</span>
          </nav>
          <details class="sb-disclosure">
            <summary>How do I load the styles?</summary>
            <p class="sb-disclosure-copy">
              Import <code>@simple-base/css</code> once in your app. Individual stylesheet subpaths
              are also available; load the token stylesheet first.
            </p>
          </details>
        </div>
      </Example>
      <Example
        title="Command popover"
        description="The menu classes provide appearance, not an ARIA menu widget. This native disclosure contains ordinary buttons; use Tab to move between commands and Escape to close."
        code={
          '<details class="sb-menu">\n  <summary class="sb-button" data-variant="secondary">Commands</summary>\n  <div class="sb-menu-panel">\n    <button class="sb-menu-item">Rename</button>\n  </div>\n</details>'
        }
      >
        <div class="preview-stack">
          <div class="preview-demo-menu">
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
                    </button>
                  )}
                </For>
              </div>
            </details>
          </div>
          <p class="preview-status" role="status">
            {menuAction()}
          </p>
        </div>
      </Example>
      <Example
        title="Empty state"
        description="Explain what is missing and offer a relevant next action. Adding a record here only changes this local specimen."
        code={
          '<div class="sb-empty-state">\n  <h3 class="sb-heading-3">No saved views</h3>\n  <p>Save a view to return to it later.</p>\n</div>'
        }
      >
        <Show
          when={hasRecord()}
          fallback={
            <div class="sb-empty-state">
              <span class="sb-empty-state-mark" aria-hidden="true">
                ∅
              </span>
              <h3 class="sb-heading-3">No example records</h3>
              <p>Add a record to see this specimen change.</p>
              <Button onClick={() => setHasRecord(true)}>Add example record</Button>
            </div>
          }
        >
          <div class="preview-stack">
            <p class="sb-text-body" role="status">
              One example record added.
            </p>
            <div>
              <Button variant="secondary" onClick={() => setHasRecord(false)}>
                Reset example
              </Button>
            </div>
          </div>
        </Show>
      </Example>
      <Api
        rows={[
          [
            "CSS contract",
            "class + data attributes",
            "These are HTML styling patterns. Behavior and accessible semantics belong to the consuming app.",
          ],
          [
            "Individual imports",
            '"@simple-base/css/card", "@simple-base/css/table", …',
            "Subpaths match stylesheet names. Always import @simple-base/tokens/css before individual stylesheets.",
          ],
          [
            "Aliases",
            "segmented-control / segmented · empty-state-mark / empty-mark",
            "Root and part classes with a shorter alternative name. Variants and state always use data or ARIA attributes, never modifier classes.",
          ],
          [
            "Keyboard shortcuts",
            'class="sb-shortcut"',
            "See Typography for the keycap and code specimens.",
          ],
        ]}
      />
    </>
  );
}
