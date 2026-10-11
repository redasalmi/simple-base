import { type Component, createSignal, createUniqueId, For, Show } from "solid-js";

// Each example is a real component, rendered on the page and shown as its own source, so what
// the reader copies is what type-checks and what the axe run in CI checks.
const components = import.meta.glob<Component>("../examples/*/*.tsx", {
  eager: true,
  import: "default",
});
const sources = import.meta.glob<string>("../examples/*/*.tsx", {
  eager: true,
  import: "default",
  query: "?raw",
});

export function Example(props: {
  title: string;
  description: string;
  /** The file under src/examples, without its extension, such as "select/SingleValue". */
  example: string;
  /** Reports what a form in the example submits, instead of submitting it. */
  form?: boolean;
}) {
  const id = createUniqueId();
  const path = `../examples/${props.example}.tsx`;
  const Demo = components[path];
  if (!Demo) throw new Error(`No example at src/examples/${props.example}.tsx`);
  const [status, setStatus] = createSignal("Submit the form to see the data it sends.");

  return (
    <section class="preview-example" aria-labelledby={id}>
      <div class="preview-example-heading">
        <h2 id={id} class="sb-heading-3">
          {props.title}
        </h2>
        <p>{props.description}</p>
      </div>
      <div class="preview-example-content">
        <div
          class="preview-stage"
          onSubmit={
            props.form
              ? (event) => {
                  event.preventDefault();
                  const entries = [...new FormData(event.target as HTMLFormElement)].map(
                    ([name, value]) => `${name}=${String(value)}`,
                  );
                  setStatus(
                    entries.length > 0 ? `Submitted ${entries.join(", ")}` : "Submitted no data.",
                  );
                }
              : undefined
          }
          onReset={props.form ? () => setStatus("Form reset.") : undefined}
        >
          <Demo />
          <Show when={props.form}>
            <p class="preview-status" role="status">
              {status()}
            </p>
          </Show>
        </div>
        <details class="preview-source">
          <summary>View code</summary>
          <pre class="sb-code-block">
            <code>{sources[path]}</code>
          </pre>
        </details>
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
