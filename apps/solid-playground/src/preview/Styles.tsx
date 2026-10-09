import { For, Show, createSignal } from "solid-js";
import { Button, Checkbox } from "@simple-base/solid";
import { Api, Example } from "./Preview";

export function Styles() {
  const [progress, setProgress] = createSignal(64);
  const [view, setView] = createSignal("List");
  const [tab, setTab] = createSignal(0);
  const [page, setPage] = createSignal(1);
  const [selected, setSelected] = createSignal<string[]>([]);
  const [menuAction, setMenuAction] = createSignal("Choose an example command.");
  const [tooltip, setTooltip] = createSignal(false);
  let menu: HTMLDetailsElement | undefined;
  const tabNames = ["Overview", "Activity", "Settings"];
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
        title="Progress & range"
        description="A native range input drives the progress specimen. Values are local, not a running upload or a fabricated metric."
        code={
          '<input class="sb-range" type="range" min="0" max="100" />\n<div class="sb-progress" role="progressbar" aria-valuenow={value()}\n  aria-valuemin={0} aria-valuemax={100}\n  style={{ "--sb-progress-value": `${value()}%` }}>\n  <span />\n</div>'
        }
      >
        <div class="preview-stack">
          <label class="sb-field">
            <span class="sb-field-title">Example completion</span>
            <input
              class="sb-range"
              type="range"
              min="0"
              max="100"
              value={progress()}
              onInput={(event) => setProgress(Number(event.currentTarget.value))}
            />
          </label>
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
          <For each={["warning", "danger", "info"] as const}>
            {(status) => (
              <div
                class="sb-progress"
                data-status={status}
                role="progressbar"
                aria-label={`Example ${status} progress`}
                aria-valuenow={progress()}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ "--sb-progress-value": `${progress()}%` }}
              >
                <span class="sb-progress-value" />
              </div>
            )}
          </For>
          <div
            class="sb-progress"
            data-state="indeterminate"
            role="progressbar"
            aria-label="Loading"
          >
            <span class="sb-progress-value" />
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
            <label class="sb-field">
              <span class="sb-field-title">Delivery</span>
              <span class="sb-select-wrap">
                <select class="sb-select">
                  <option>Daily summary</option>
                  <option>Weekly summary</option>
                  <option>Never</option>
                </select>
              </span>
            </label>
            <label class="sb-field">
              <span class="sb-field-title">Locked delivery</span>
              <span class="sb-select-wrap">
                <select class="sb-select" disabled>
                  <option>Managed by your team</option>
                </select>
              </span>
            </label>
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
        title="Fieldset errors"
        description="A required choice group with an error message. Text inputs and text areas use the Field component; fieldsets and choices stay CSS patterns."
        code={
          '<fieldset class="sb-fieldset">\n  <legend class="sb-field-title" data-required>Terms</legend>\n  <div class="sb-choice-list">\n    <label class="sb-choice">\n      <Checkbox aria-invalid="true" aria-describedby="terms-error" />\n      <span>I have reviewed the invoice totals</span>\n    </label>\n  </div>\n  <span class="sb-field-error" id="terms-error">Confirm the totals before sending.</span>\n</fieldset>'
        }
      >
        <fieldset class="sb-fieldset">
          <legend class="sb-field-title" data-required>
            Terms
          </legend>
          <div class="sb-choice-list">
            <label class="sb-choice">
              <Checkbox aria-invalid="true" aria-describedby="field-terms-error" />
              <span>I have reviewed the invoice totals</span>
            </label>
          </div>
          <span class="sb-field-error" id="field-terms-error">
            Confirm the totals before sending.
          </span>
        </fieldset>
      </Example>
      <Example
        title="Tooltip"
        description="A short, non-essential label for an icon-only control. The component shows it on hover and focus and positions it with an arrow; this specimen toggles it on focus and hover."
        code={
          '<div class="sb-tooltip-content" data-state="open">\n  Download PDF <kbd class="sb-shortcut">D</kbd>\n</div>'
        }
      >
        <div class="preview-row" style={{ "min-height": "96px", "align-items": "flex-start" }}>
          <div style={{ position: "relative" }}>
            <Button
              variant="secondary"
              aria-label="Download PDF"
              aria-describedby="tooltip-download"
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
              onFocus={() => setTooltip(true)}
              onBlur={() => setTooltip(false)}
            >
              ⤓
            </Button>
            <Show when={tooltip()}>
              <div
                class="sb-tooltip-content"
                id="tooltip-download"
                role="tooltip"
                data-state="open"
                style={{ position: "absolute", top: "calc(100% + 8px)", left: "0" }}
              >
                Download PDF <kbd class="sb-shortcut">D</kbd>
              </div>
            </Show>
          </div>
          <div
            class="sb-tooltip-content"
            data-state="open"
            data-instant
            style={{ "z-index": "auto" }}
          >
            Always visible specimen
          </div>
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
            <button
              class="sb-page-button"
              aria-label="Previous page"
              disabled={page() === 1}
              onClick={() => setPage((value) => value - 1)}
            >
              ‹
            </button>
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
            <button
              class="sb-page-button"
              aria-label="Next page"
              disabled={page() === 3}
              onClick={() => setPage((value) => value + 1)}
            >
              ›
            </button>
          </nav>
          <nav class="sb-pagination" aria-label="Ellipsis specimen">
            <button class="sb-page-button">1</button>
            <span class="sb-page-ellipsis" aria-hidden="true">
              …
            </span>
            <button class="sb-page-button">11</button>
            <button class="sb-page-button" aria-current="page">
              12
            </button>
            <button class="sb-page-button">13</button>
            <span class="sb-page-ellipsis" aria-hidden="true">
              …
            </span>
            <button class="sb-page-button">40</button>
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
