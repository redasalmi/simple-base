import { For, createEffect, createSignal, onCleanup, onMount, type Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  Select,
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from "@simple-base/solid";
import { Typography } from "./preview/Typography";
import { Buttons } from "./preview/Buttons";
import { Badges } from "./preview/Badges";
import { Cards } from "./preview/Cards";
import { AlertDialogs } from "./preview/AlertDialogs";
import { Inputs, TextAreas, Checkboxes, Radios, Switches } from "./preview/Inputs";
import { Comboboxes } from "./preview/Comboboxes";
import { Selects } from "./preview/Selects";
import { Tables } from "./preview/Tables";
import { Styles } from "./preview/Styles";

type Page = {
  id: string;
  label: string;
  group: string;
  description: string;
  usage: string;
  component: Component;
};

const pages: Page[] = [
  {
    id: "typography",
    label: "Typography",
    group: "Foundations",
    description:
      "A practical type scale for interfaces. Sans serif for the work; an optional serif display style when the content calls for it.",
    usage: 'import "@simple-base/css/typography";',
    component: Typography,
  },
  {
    id: "buttons",
    label: "Button",
    group: "Components",
    description:
      "Actions with a clear order of importance. Six variants, three sizes, and native button behavior—without movement or decorative effects.",
    usage: 'import { Button } from "@simple-base/solid";',
    component: Buttons,
  },
  {
    id: "badges",
    label: "Badge",
    group: "Components",
    description:
      "Short, non-interactive labels for status and metadata. Use the text to carry meaning; color is supporting information.",
    usage: 'import { Badge } from "@simple-base/solid";',
    component: Badges,
  },
  {
    id: "card",
    label: "Card",
    group: "Components",
    description:
      "Group related content on a bordered surface, or drop the surface for content that already sits on one. Cards have no default elevation and no interactive behavior.",
    usage: 'import { Card } from "@simple-base/solid";',
    component: Cards,
  },
  {
    id: "input",
    label: "Input",
    group: "Components",
    description:
      "Single-line entry with native input types, validation, and familiar browser behavior. Always pair the control with a visible label.",
    usage: 'import { Input } from "@simple-base/solid";',
    component: Inputs,
  },
  {
    id: "combobox",
    label: "Combobox",
    group: "Components",
    description:
      "Search a list of options as you type, then select a value. Named parts provide a labeled input, keyboard navigation, and a portaled popup with an empty state.",
    usage: 'import { Combobox, ComboboxInput, ComboboxItem } from "@simple-base/solid";',
    component: Comboboxes,
  },
  {
    id: "select",
    label: "Select",
    group: "Components",
    description:
      "Pick a single option from a known list. Named parts provide a labeled trigger, keyboard typeahead, and a portaled popup that shares the combobox popup styling.",
    usage: 'import { Select, SelectTrigger, SelectItem } from "@simple-base/solid";',
    component: Selects,
  },
  {
    id: "table",
    label: "Table",
    group: "Components",
    description:
      "Display records in rows and columns. Named parts map to native table elements, with optional cell variants and a scroll container for wide data.",
    usage: 'import { Table, TableHeader, TableCell } from "@simple-base/solid";',
    component: Tables,
  },
  {
    id: "textarea",
    label: "TextArea",
    group: "Components",
    description:
      "Room for longer answers. A vertically resizable text field with the same focus, validation, and disabled treatments as Input.",
    usage: 'import { TextArea } from "@simple-base/solid";',
    component: TextAreas,
  },
  {
    id: "checkbox",
    label: "Checkbox",
    group: "Components",
    description:
      "Independent choices that can be combined. A native checkbox, styled by the system and labeled by its surrounding content.",
    usage: 'import { Checkbox } from "@simple-base/solid";',
    component: Checkboxes,
  },
  {
    id: "radio",
    label: "Radio",
    group: "Components",
    description:
      "One choice from a related set. Group radios with a shared name and describe the decision with a fieldset and legend.",
    usage: 'import { Radio } from "@simple-base/solid";',
    component: Radios,
  },
  {
    id: "switch",
    label: "Switch",
    group: "Components",
    description:
      "An immediate on or off preference. A native checkbox with switch semantics and a required accessible name.",
    usage: 'import { Switch } from "@simple-base/solid";',
    component: Switches,
  },
  {
    id: "alert-dialog",
    label: "AlertDialog",
    group: "Components",
    description:
      "A deliberate pause before a destructive action. Named parts compose a native dialog with a linked title and description.",
    usage:
      'import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from "@simple-base/solid";',
    component: AlertDialogs,
  },
  {
    id: "styles",
    label: "CSS patterns",
    group: "Styles",
    description:
      "The rest of the stylesheet collection, using native HTML and local demo state. These patterns are not exported Solid components.",
    usage: 'import "@simple-base/css";',
    component: Styles,
  },
];

const themes = [
  ["simple-base-dark", "Simple Base dark"],
  ["simple-base-light", "Simple Base light"],
  ["catppuccin-latte", "Catppuccin Latte"],
  ["catppuccin-frappe", "Catppuccin Frappé"],
  ["catppuccin-macchiato", "Catppuccin Macchiato"],
  ["catppuccin-mocha", "Catppuccin Mocha"],
  ["dracula", "Dracula"],
  ["tokyo-night", "Tokyo Night"],
  ["nord", "Nord"],
] as const;

const themeOptions = themes.map(([value, label]) => ({ label, value }));

function ChevronDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function pageFromHash() {
  return pages.find((page) => page.id === window.location.hash.slice(1)) ?? pages[1]!;
}

export default function App() {
  const [current, setCurrent] = createSignal(pageFromHash());
  const [theme, setTheme] = createSignal("simple-base-dark");
  let title: HTMLHeadingElement | undefined;

  createEffect(() => {
    document.documentElement.dataset.theme = theme();
  });
  createEffect(() => {
    document.title = `${current().label} · Simple Base Solid`;
  });

  onMount(() => {
    const navigate = () => {
      setCurrent(pageFromHash());
      window.scrollTo(0, 0);
      title?.focus({ preventScroll: true });
    };
    window.addEventListener("hashchange", navigate);
    onCleanup(() => window.removeEventListener("hashchange", navigate));
  });

  return (
    <div class="playground">
      <a
        class="playground-skip"
        href="#preview-content"
        onClick={(event) => {
          event.preventDefault();
          title?.focus();
        }}
      >
        Skip to content
      </a>
      <header class="playground-header">
        <div class="playground-header-inner">
          <a class="playground-brand" href="#buttons">
            Simple Base<span>Solid reference</span>
          </a>
          <div class="playground-theme">
            <Select
              id="playground-theme-select"
              label="Theme"
              options={themeOptions}
              value={theme()}
              onValueChange={setTheme}
            >
              <SelectLabel />
              <SelectControl>
                <SelectTrigger>
                  <SelectValueText />
                  <SelectIndicator>
                    <ChevronDown />
                  </SelectIndicator>
                </SelectTrigger>
              </SelectControl>
              <SelectPortal>
                <SelectPositioner>
                  <SelectContent>
                    <SelectList>{(option) => <SelectItem option={option} />}</SelectList>
                  </SelectContent>
                </SelectPositioner>
              </SelectPortal>
            </Select>
          </div>
        </div>
      </header>
      <div class="playground-layout">
        <aside class="playground-sidebar">
          <nav aria-label="Reference">
            <For each={["Foundations", "Components", "Styles"]}>
              {(group) => (
                <div class="playground-nav-group">
                  <h2>{group}</h2>
                  <For each={pages.filter((page) => page.group === group)}>
                    {(page) => (
                      <a
                        href={`#${page.id}`}
                        aria-current={current().id === page.id ? "page" : undefined}
                      >
                        {page.label}
                      </a>
                    )}
                  </For>
                </div>
              )}
            </For>
          </nav>
          <div class="playground-setup">
            <h2>Start with the styles</h2>
            <p>Load once in your app, then import the components you need.</p>
            <code>import "@simple-base/css";</code>
          </div>
        </aside>
        <label class="playground-mobile-nav">
          <span>Browse reference</span>
          <span class="sb-select-wrap">
            <select
              class="sb-select"
              aria-label="Browse reference"
              value={current().id}
              onChange={(event) => {
                window.location.hash = event.currentTarget.value;
              }}
            >
              <For each={pages}>{(page) => <option value={page.id}>{page.label}</option>}</For>
            </select>
          </span>
        </label>
        <main id="preview-content" class="playground-main">
          <div class="playground-page-heading">
            <h1
              ref={(element) => {
                title = element;
              }}
              tabIndex={-1}
            >
              {current().label}
            </h1>
            <p>{current().description}</p>
            <pre class="playground-import">
              <code>{current().usage}</code>
            </pre>
          </div>
          <Dynamic component={current().component} />
          <footer class="playground-footer">
            Live local examples. No data is sent or saved. Hover and use Tab to inspect interaction
            states.
          </footer>
        </main>
      </div>
    </div>
  );
}
