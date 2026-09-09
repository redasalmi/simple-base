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
