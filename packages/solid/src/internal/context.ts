import { createContext, useContext } from "solid-js";

/** A context whose hook throws when a part is rendered outside its root. */
export function createRequiredContext<T>(parts: string, root = parts) {
  const Context = createContext<T>();
  const article = /^[aeiou]/i.test(root) ? "an" : "a";

  function use() {
    const value = useContext(Context);
    if (value === undefined)
      throw new Error(`${parts} parts must be used within ${article} ${root}`);

    return value;
  }

  return [Context.Provider, use] as const;
}
