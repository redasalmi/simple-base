import { For, Show, createUniqueId, type JSX } from "solid-js";

export function Example(props: {
  title: string;
  description: string;
  code?: string;
  children: JSX.Element;
}) {
  const id = createUniqueId();
  return (
    <section class="preview-example" aria-labelledby={id}>
      <div class="preview-example-heading">
        <h2 id={id} class="sb-heading-3">
          {props.title}
        </h2>
        <p>{props.description}</p>
      </div>
      <div class="preview-example-content">
        <div class="preview-stage">{props.children}</div>
        <Show when={props.code}>
          <details class="preview-source">
            <summary>View code</summary>
            <pre class="sb-code-block">
              <code>{props.code}</code>
            </pre>
          </details>
        </Show>
      </div>
    </section>
  );
}

export function Api(props: { rows: readonly (readonly [string, string, string])[] }) {
  return (
    <section class="preview-api" aria-label="API reference">
      <h2 class="sb-heading-3">At a glance</h2>
      <dl>
        <For each={props.rows}>
          {([name, value, description]) => (
            <div>
              <dt>
                <code>{name}</code>
              </dt>
              <dd>
                <code>{value}</code>
                <p>{description}</p>
              </dd>
            </div>
          )}
        </For>
      </dl>
    </section>
  );
}

export function Field(props: { label: string; hint?: string; children: JSX.Element }) {
  return (
    <label class="sb-field preview-field">
      <span class="sb-field-title">{props.label}</span>
      {props.children}
      <Show when={props.hint}>
        <span class="sb-field-help">{props.hint}</span>
      </Show>
    </label>
  );
}

function Icon(props: { children: JSX.Element }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {props.children}
    </svg>
  );
}

export function CheckIcon() {
  return (
    <Icon>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Icon>
  );
}

export function WarningIcon() {
  return (
    <Icon>
      <path d="M12 3.5l9.5 16.5h-19z" />
      <path d="M12 10v4.5M12 17.5v.01" />
    </Icon>
  );
}

export function CloseIcon() {
  return (
    <Icon>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </Icon>
  );
}
