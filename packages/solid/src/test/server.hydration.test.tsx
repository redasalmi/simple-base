import { type JSX, onMount, sharedConfig } from "solid-js";
import { hydrate, render } from "solid-js/web";
import { afterEach, describe, expect, test, vi } from "vitest";
import { commands } from "vitest/browser";

import type { RenderFixtureOptions } from "../../vitest.config";
import { type FixtureName, fixtures } from "./fixtures";

declare module "vitest/browser" {
  interface BrowserCommands {
    renderFixture: (name: FixtureName, options: RenderFixtureOptions) => Promise<string>;
  }
}

// The browser runs in Pacific/Kiritimati (UTC+14), set in vitest.config.ts, and the server in UTC,
// so at noon UTC the browser is already on the next day.
const now = Date.UTC(2026, 9, 9, 12);
const serverTimeZone = "UTC";

const disposers: (() => void)[] = [];

afterEach(() => {
  for (const dispose of disposers.splice(0)) dispose();
  document.body.replaceChildren();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

/**
 * The markup as tags, sorted attributes, and text, without Solid's hydration keys and markers.
 * Form controls show what they display, since the server writes `value` and `checked` as
 * attributes and the browser sets them as properties.
 */
function snapshot(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent?.trim() ? node.textContent : "";
  if (!(node instanceof Element)) return "";

  const isControl = node instanceof HTMLInputElement || node instanceof HTMLSelectElement;
  const attributes = [...node.attributes]
    .filter(
      (attribute) =>
        attribute.name !== "data-hk" &&
        !(isControl && (attribute.name === "value" || attribute.name === "checked")),
    )
    .map((attribute) => {
      let value = attribute.value;
      // The server writes `a:b` and leaves a space after merged classes; the browser normalizes both.
      if (attribute.name === "style" && node instanceof HTMLElement) value = node.style.cssText;
      if (attribute.name === "class") value = value.split(/\s+/).filter(Boolean).join(" ");
      return ` ${attribute.name}="${value}"`;
    });
  if (isControl) attributes.push(` .value="${node.value}"`);
  if (node instanceof HTMLInputElement) attributes.push(` .checked="${node.checked}"`);
  if (node instanceof HTMLOptionElement) attributes.push(` .selected="${node.selected}"`);
  const children = [...node.childNodes].map(snapshot);

  return `<${node.localName}${attributes.toSorted().join("")}>${children.join("")}</${node.localName}>`;
}

/** Renders `fixture` and copies the DOM after render effects, before any `onMount`. */
function renderFirstPass(
  mount: (code: () => JSX.Element, element: HTMLElement) => () => void,
  fixture: () => JSX.Element,
  container: HTMLElement,
) {
  let firstPass = container;
  disposers.push(
    mount(() => {
      // Created before the fixture's own, so it runs first: after render effects, before any onMount.
      onMount(() => {
        firstPass = container.cloneNode(true) as HTMLElement;
      });
      return fixture();
    }, container),
  );
  return firstPass;
}

/**
 * The server numbers `createUniqueId` by position in the tree, the client counts up (`cl-3`). Pair
 * the elements with an `id` in document order to map each client id to the server's.
 */
function useServerIds(client: HTMLElement, server: HTMLElement) {
  const clientIds = [...client.querySelectorAll("[id]")].map((element) => element.id);
  const serverIds = [...server.querySelectorAll("[id]")].map((element) => element.id);
  const mapping = new Map<string, string>();
  clientIds.forEach((clientId, index) => {
    const generated = /cl-\d+/.exec(clientId)?.[0];
    if (!generated || mapping.has(generated)) return;
    const pattern = clientId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(generated, "(.+)");
    const match = new RegExp(`^${pattern}$`).exec(serverIds[index] ?? "");
    if (match) mapping.set(generated, match[1]);
  });

  for (const element of [client, ...client.querySelectorAll("*")]) {
    for (const attribute of element.attributes) {
      attribute.value = attribute.value.replace(/cl-\d+/g, (id) => mapping.get(id) ?? id);
    }
  }
}

/**
 * Renders a fixture on the server, then in the browser twice: once from scratch, to see what the
 * client renders before any `onMount`, and once by hydrating the server's markup.
 *
 * Solid trusts the server's attributes and text while hydrating, so a mismatch doesn't show in the
 * hydrated DOM; it stays there until the value changes. Comparing the server's markup with a
 * client render is what finds it.
 */
async function renderBothSides(name: FixtureName) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(now);
  const consoleError = vi.spyOn(console, "error");
  const html = await commands.renderFixture(name, { now, timeZone: serverTimeZone });

  const server = document.createElement("div");
  server.innerHTML = html;

  const clientContainer = document.createElement("div");
  document.body.append(clientContainer);
  const client = renderFirstPass(render, fixtures[name], clientContainer);
  useServerIds(client, server);

  const hydrated = document.createElement("div");
  hydrated.innerHTML = html;
  document.body.append(hydrated);
  const serverElements = [...hydrated.querySelectorAll("*")];
  // Solid marks hydration done after the first delegated event and never resets it, since a page
  // normally hydrates once.
  sharedConfig.done = false;
  // Solid's hydration registry, normally set up by `generateHydrationScript()` in the server's HTML.
  Object.assign(globalThis, { _$HY: { events: [], completed: new WeakSet(), r: {} } });
  renderFirstPass(hydrate, fixtures[name], hydrated);

  return {
    server: snapshot(server),
    client: snapshot(client),
    /** Server elements that hydration replaced instead of reusing. */
    replaced: serverElements.filter((element) => !hydrated.contains(element)),
    errors: consoleError.mock.calls,
  };
}

async function expectNoMismatch(name: FixtureName) {
  const { server, client, replaced, errors } = await renderBothSides(name);

  expect(client).toBe(server);
  expect(replaced).toEqual([]);
  expect(errors).toEqual([]);
}

// Z1: these inputs set `defaultValue` through `prop:`, which the server leaves out, so the server's
// inputs are empty until hydration. Phase 4 spreads Zag's props, which render `value` on the server.
const z1: FixtureName[] = ["Combobox", "DatePicker", "NumberField"];
// K8: without `timeZone`, the server marks today in its own zone and the browser in the user's.
// Phase 5 renders in UTC on the server and during hydration, then switches to the user's zone.
const k8: FixtureName[] = ["DatePickerCalendar"];
// The server drops `prop:defaultValue` and writes `defaultChecked` as an attribute the browser
// ignores, so default values and choices are missing until hydration. Phase 4 fixes it.
const nativeDefaults: FixtureName[] = [
  "Checkbox",
  "CheckboxGroup",
  "Fieldset",
  "Input",
  "Radio",
  "RadioGroup",
  "TextArea",
];

const expectedToFail = new Set([...z1, ...k8, ...nativeDefaults]);
const matching = (Object.keys(fixtures) as FixtureName[]).filter(
  (name) => !expectedToFail.has(name),
);

describe("hydration", () => {
  test.each(matching)("%s hydrates without a mismatch", expectNoMismatch);

  test.fails.each(z1)("%s hydrates without a mismatch (Z1)", expectNoMismatch);

  test.fails.each(k8)("%s without `timeZone` hydrates without a mismatch (K8)", expectNoMismatch);

  test.fails.each(nativeDefaults)(
    "%s hydrates without a mismatch (default state)",
    expectNoMismatch,
  );
});
