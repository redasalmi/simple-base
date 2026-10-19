import { examples } from "./examples";

/** Renders the example at src/examples/solid/<name>.tsx. Example.astro hydrates it. */
export default function Demo(props: { name: string }) {
  const Example = examples[`./${props.name}.tsx`];
  if (!Example) throw new Error(`No example at src/examples/solid/${props.name}.tsx`);
  return <Example />;
}
