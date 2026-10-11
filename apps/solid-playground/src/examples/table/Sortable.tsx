import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableRowHeader,
  TableSortButton,
  TableWrap,
} from "@simple-base/solid";
import { createSignal, For } from "solid-js";

import { documents } from "../data";

type SortKey = "name" | "owner" | "words";

export default function Sortable() {
  const [sort, setSort] = createSignal<{ key: SortKey; direction: "ascending" | "descending" }>({
    key: "name",
    direction: "ascending",
  });
  const sortedDocuments = () => {
    const { key, direction } = sort();
    const order = direction === "ascending" ? 1 : -1;
    return documents.toSorted((a, b) =>
      key === "words" ? (a.words - b.words) * order : a[key].localeCompare(b[key]) * order,
    );
  };
  const ariaSort = (key: SortKey) => (sort().key === key ? sort().direction : undefined);
  const toggleSort = (key: SortKey) =>
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "ascending" ? "descending" : "ascending",
    }));

  return (
    <TableWrap role="region" aria-label="Sortable documents" tabIndex={0}>
      <Table>
        <TableCaption class="sb-text-caption">Fictional documents</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>ID</TableColumnHeader>
            <TableColumnHeader aria-sort={ariaSort("name")}>
              <TableSortButton onClick={() => toggleSort("name")}>Document</TableSortButton>
            </TableColumnHeader>
            <TableColumnHeader aria-sort={ariaSort("owner")}>
              <TableSortButton onClick={() => toggleSort("owner")}>Owner</TableSortButton>
            </TableColumnHeader>
            <TableColumnHeader aria-sort={ariaSort("words")}>
              <TableSortButton onClick={() => toggleSort("words")}>Words</TableSortButton>
            </TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={sortedDocuments()}>
            {(document) => (
              <TableRow>
                <TableCell variant="code">{document.id}</TableCell>
                <TableRowHeader>{document.name}</TableRowHeader>
                <TableCell>{document.owner}</TableCell>
                <TableCell variant="number">{document.words.toLocaleString()}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </TableWrap>
  );
}
