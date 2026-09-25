import { For, Show, createSignal } from "solid-js";
import { Button, Checkbox } from "@simple-base/solid";
import { Api, Example, Field } from "./Preview";

// September 2026 starts on a Tuesday.
const calendarWeeks = Array.from({ length: 5 }, (_, week) =>
  Array.from({ length: 7 }, (_, weekday) => {
    const date = week * 7 + weekday;
    if (date === 0) return { day: 31, outside: true };
    if (date > 30) return { day: date - 30, outside: true };
    return { day: date, outside: false };
  }),
);

export function Styles() {
  const [progress, setProgress] = createSignal(64);
  const [view, setView] = createSignal("List");
  const [tab, setTab] = createSignal(0);
  const [page, setPage] = createSignal(1);
  const [selected, setSelected] = createSignal<string[]>([]);
  const [menuAction, setMenuAction] = createSignal("Choose an example command.");
  const [hasRecord, setHasRecord] = createSignal(false);
  const [showAlert, setShowAlert] = createSignal(true);
  const [quantity, setQuantity] = createSignal(3);
  const [day, setDay] = createSignal(30);
  const [tooltip, setTooltip] = createSignal(false);
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
        description="Status lines and alerts support success, warning, danger, and info. Keep the message specific and include a recovery path when needed."
        code={
          '<div class="sb-status-line" data-status="success">\n  <span class="sb-status-dot" aria-hidden="true" />\n  <div><strong>Changes saved</strong><p>Your preferences are up to date.</p></div>\n</div>'
        }
      >
        <div class="preview-stack">
          <For
            each={[
              ["success", "Changes saved", "Your preferences are up to date."],
              ["warning", "Payment overdue", "INV-0042 was due 12 days ago."],
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
          <Show when={showAlert()}>
            <div class="sb-alert" data-status="warning" role="status">
              <span class="sb-alert-mark" aria-hidden="true">
                !
              </span>
              <div class="sb-alert-content">
                <strong>2 invoices are overdue</strong>
                <p>Send a reminder or record a payment to clear them.</p>
                <div class="sb-alert-actions">
                  <Button size="small" variant="secondary">
                    Send reminders
                  </Button>
                  <Button size="small" variant="ghost">
                    View invoices
                  </Button>
                </div>
              </div>
              <button
                class="sb-alert-close"
                aria-label="Dismiss overdue invoices alert"
                onClick={() => setShowAlert(false)}
              >
                ×
              </button>
            </div>
          </Show>
          <div class="sb-alert" data-status="success">
            <span class="sb-alert-mark" aria-hidden="true">
              ✓
            </span>
            <div>
              <strong>Invoice sent</strong>
              <p>The client will receive it within a few minutes.</p>
            </div>
          </div>
          <div class="sb-alert" data-status="info">
            <div>
              <strong>Scheduled maintenance</strong>
              <p>Editing will be unavailable during the maintenance window.</p>
            </div>
          </div>
        </div>
      </Example>
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
        title="Field"
        description="A label, help text, and error message around any control. The control carries aria-invalid and aria-describedby; the field only styles the text around it."
        code={
          '<div class="sb-field">\n  <label class="sb-field-label" for="due" data-required>Due date</label>\n  <input class="sb-input" id="due" aria-invalid="true" aria-describedby="due-error" />\n  <span class="sb-field-error" id="due-error">Pick a date after the issue date.</span>\n</div>'
        }
      >
        <div class="preview-fields">
          <div class="sb-field">
            <label class="sb-field-label" for="field-reference" data-required>
              Invoice number
            </label>
            <input
              class="sb-input"
              id="field-reference"
              value="INV-0043"
              required
              aria-describedby="field-reference-help"
            />
            <span class="sb-field-help" id="field-reference-help">
              Numbers continue from your last invoice.
            </span>
          </div>
          <div class="sb-field">
            <label class="sb-field-label" for="field-email" data-required>
              Client email
            </label>
            <input
              class="sb-input"
              id="field-email"
              value="billing@"
              required
              aria-invalid="true"
              aria-describedby="field-email-error"
            />
            <span class="sb-field-error" id="field-email-error">
              Enter a full email address, like billing@example.com.
            </span>
          </div>
          <div class="sb-field" data-disabled>
            <label class="sb-field-label" for="field-currency">
              Currency
            </label>
            <input class="sb-input" id="field-currency" value="EUR" disabled />
            <span class="sb-field-help">Set per client.</span>
          </div>
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
        </div>
      </Example>
      <Example
        title="Number input"
        description="A text input with steppers and an optional unit affix. Numbers use tabular figures so columns of amounts line up."
        code={
          '<div class="sb-number-input">\n  <label class="sb-number-input-label" for="qty">Quantity</label>\n  <div class="sb-number-input-control">\n    <input class="sb-number-input-input" id="qty" inputmode="decimal" />\n    <button class="sb-number-input-trigger" aria-label="Decrease">−</button>\n    <button class="sb-number-input-trigger" aria-label="Increase">+</button>\n  </div>\n</div>'
        }
      >
        <div class="preview-fields">
          <div class="sb-number-input">
            <label class="sb-number-input-label" for="number-quantity">
              Quantity
            </label>
            <div class="sb-number-input-control">
              <input
                class="sb-number-input-input"
                id="number-quantity"
                inputmode="numeric"
                value={quantity()}
                onChange={(event) =>
                  setQuantity(Math.max(0, Number(event.currentTarget.value) || 0))
                }
              />
              <button
                class="sb-number-input-trigger"
                aria-label="Decrease quantity"
                disabled={quantity() <= 0}
                onClick={() => setQuantity((value) => Math.max(0, value - 1))}
              >
                −
              </button>
              <button
                class="sb-number-input-trigger"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div class="sb-number-input">
            <label class="sb-number-input-label" for="number-price" data-required>
              Unit price
            </label>
            <div class="sb-number-input-control">
              <span class="sb-number-input-affix" aria-hidden="true">
                €
              </span>
              <input
                class="sb-number-input-input"
                id="number-price"
                inputmode="decimal"
                value="1,250.00"
              />
            </div>
          </div>
          <div class="sb-number-input">
            <label class="sb-number-input-label" for="number-tax">
              Tax rate
            </label>
            <div class="sb-number-input-control" data-invalid>
              <input
                class="sb-number-input-input"
                id="number-tax"
                inputmode="decimal"
                value="120"
                aria-invalid="true"
              />
              <span class="sb-number-input-affix" aria-hidden="true">
                %
              </span>
            </div>
          </div>
          <div class="sb-number-input">
            <label class="sb-number-input-label" for="number-locked">
              Discount
            </label>
            <div class="sb-number-input-control" data-disabled>
              <input class="sb-number-input-input" id="number-locked" value="0" disabled />
              <button class="sb-number-input-trigger" aria-label="Decrease discount" disabled>
                −
              </button>
              <button class="sb-number-input-trigger" aria-label="Increase discount" disabled>
                +
              </button>
            </div>
          </div>
        </div>
      </Example>
      <Example
        title="Date picker"
        description="The input, trigger, and calendar grid. This specimen shows the calendar inline; the component positions it under the input. Today is outlined, the selected day is filled."
        code={
          '<div class="sb-date-picker-content" data-inline>\n  <div class="sb-date-picker-view-control">…</div>\n  <table class="sb-date-picker-table">\n    <td class="sb-date-picker-table-cell">\n      <div class="sb-date-picker-cell-trigger" data-view="day" data-selected>25</div>\n    </td>\n  </table>\n</div>'
        }
      >
        <div class="preview-stack">
          <div class="sb-date-picker">
            <label class="sb-date-picker-label" for="date-due" data-required>
              Due date
            </label>
            <div class="sb-date-picker-control">
              <input
                class="sb-date-picker-input"
                id="date-due"
                placeholder="dd/mm/yyyy"
                value={`${String(day()).padStart(2, "0")}/09/2026`}
                readOnly
              />
              <button class="sb-date-picker-trigger" aria-label="Open calendar">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
              </button>
            </div>
          </div>
          <div class="sb-date-picker-content" data-inline style={{ "max-width": "320px" }}>
            <div class="sb-date-picker-view-control">
              <button class="sb-date-picker-nav-trigger" aria-label="Previous month">
                ‹
              </button>
              <button class="sb-date-picker-view-trigger">September 2026</button>
              <button class="sb-date-picker-nav-trigger" aria-label="Next month">
                ›
              </button>
            </div>
            <table class="sb-date-picker-table" role="grid">
              <thead>
                <tr>
                  <For each={["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]}>
                    {(weekday) => (
                      <th class="sb-date-picker-table-header" scope="col">
                        {weekday}
                      </th>
                    )}
                  </For>
                </tr>
              </thead>
              <tbody>
                <For each={calendarWeeks}>
                  {(week) => (
                    <tr>
                      <For each={week}>
                        {(cell) => (
                          <td class="sb-date-picker-table-cell">
                            <div
                              class="sb-date-picker-cell-trigger"
                              role="button"
                              tabIndex={cell.outside ? -1 : 0}
                              data-view="day"
                              data-outside-range={cell.outside ? "" : undefined}
                              data-today={!cell.outside && cell.day === 25 ? "" : undefined}
                              data-selected={!cell.outside && cell.day === day() ? "" : undefined}
                              data-disabled={!cell.outside && cell.day < 3 ? "" : undefined}
                              aria-disabled={!cell.outside && cell.day < 3 ? "true" : undefined}
                              onClick={() => {
                                if (!cell.outside && cell.day >= 3) setDay(cell.day);
                              }}
                              onKeyDown={(event) => {
                                if (
                                  (event.key === "Enter" || event.key === " ") &&
                                  !cell.outside &&
                                  cell.day >= 3
                                ) {
                                  event.preventDefault();
                                  setDay(cell.day);
                                }
                              }}
                            >
                              {cell.day}
                            </div>
                          </td>
                        )}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
            <div class="sb-date-picker-presets">
              <Button size="small" variant="secondary" onClick={() => setDay(25)}>
                Today
              </Button>
              <Button size="small" variant="ghost" onClick={() => setDay(30)}>
                End of month
              </Button>
            </div>
          </div>
        </div>
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
      <Example
        title="Empty state"
        description="Explain what is missing and offer a relevant next action. Adding a record here only changes this local specimen."
        code={
          '<div class="sb-empty-state">\n  <h3 class="sb-empty-state-title">No saved views</h3>\n  <p class="sb-empty-state-description">Save a view to return to it later.</p>\n  <div class="sb-empty-state-actions">…</div>\n</div>'
        }
      >
        <Show
          when={hasRecord()}
          fallback={
            <div class="sb-empty-state">
              <span class="sb-empty-state-mark" aria-hidden="true">
                ∅
              </span>
              <h3 class="sb-empty-state-title">No example records</h3>
              <p class="sb-empty-state-description">Add a record to see this specimen change.</p>
              <div class="sb-empty-state-actions">
                <Button onClick={() => setHasRecord(true)}>Add example record</Button>
                <Button variant="ghost">Import from CSV</Button>
              </div>
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
