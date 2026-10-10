import { type Accessor, createSignal, onCleanup, onMount } from "solid-js";

export type Registry<T> = {
  entries: Accessor<readonly T[]>;
  /** Adds the entry while the calling part is mounted. */
  register: (entry: T) => void;
};

// Keeps one entry per mounted part instead of a flag, so unmounting one of two parts leaves the other registered.
export function createRegistry<T = void>(): Registry<T> {
  const [entries, setEntries] = createSignal<readonly T[]>([]);

  return {
    entries,
    register(entry) {
      onMount(() => setEntries((current) => [...current, entry]));
      onCleanup(() =>
        setEntries((current) => {
          const index = current.indexOf(entry);
          return index === -1 ? current : current.toSpliced(index, 1);
        }),
      );
    },
  };
}
