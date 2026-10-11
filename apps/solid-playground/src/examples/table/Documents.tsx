import {
  Badge,
  type BadgeVariant,
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableFooter,
  TableHeader,
  TableRow,
  TableWrap,
} from "@simple-base/solid";
import { createSignal, For } from "solid-js";

import { type Document, documents } from "../data";

const statusVariant: Record<Document["status"], BadgeVariant> = {
  Published: "success",
  "In review": "warning",
  Draft: "muted",
};

const totalWords = documents.reduce((sum, document) => sum + document.words, 0);

export default function Documents() {
  const [selected, setSelected] = createSignal<string[]>([]);

  return (
    <div class="preview-stack">
      <TableWrap role="region" aria-label="Example documents" tabIndex={0}>
        <Table>
          <TableCaption class="sb-text-caption">Fictional documents</TableCaption>
          <TableHeader>
            <TableRow>
              <TableColumnHeader>Select</TableColumnHeader>
              <TableColumnHeader>ID</TableColumnHeader>
              <TableColumnHeader>Document</TableColumnHeader>
              <TableColumnHeader>Owner</TableColumnHeader>
              <TableColumnHeader>Status</TableColumnHeader>
              <TableColumnHeader>Words</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            <For each={documents}>
              {(document) => (
                <TableRow aria-selected={selected().includes(document.id)}>
                  <TableCell>
                    <Checkbox
                      aria-label={`Select ${document.name}`}
                      checked={selected().includes(document.id)}
                      onChange={(event) =>
                        setSelected((ids) =>
                          event.currentTarget.checked
                            ? [...ids, document.id]
                            : ids.filter((id) => id !== document.id),
                        )
                      }
                    />
                  </TableCell>
                  <TableCell variant="code">{document.id}</TableCell>
                  <TableCell>{document.name}</TableCell>
                  <TableCell>{document.owner}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[document.status]}>{document.status}</Badge>
                  </TableCell>
                  <TableCell variant="number">{document.words.toLocaleString()}</TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell />
              <TableCell variant="number">{totalWords.toLocaleString()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableWrap>
      <p class="preview-status" role="status">
        {selected().length === 0
          ? "No rows selected."
          : `${selected().length} row(s) selected: ${selected().join(", ")}.`}
      </p>
    </div>
  );
}
