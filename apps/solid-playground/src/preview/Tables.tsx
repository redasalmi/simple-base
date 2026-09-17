import { For, createSignal } from "solid-js";
import {
  Badge,
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableFooter,
  TableHeader,
  TableRow,
  TableRowHeader,
  TableWrap,
  type BadgeVariant,
} from "@simple-base/solid";
import { Api, Example } from "./Preview";

type Document = {
  id: string;
  name: string;
  owner: string;
  status: "Published" | "In review" | "Draft";
  words: number;
};

const documents: Document[] = [
  {
    id: "DOC-1041",
    name: "Onboarding checklist",
    owner: "A. Rivera",
    status: "Published",
    words: 1240,
  },
  { id: "DOC-1042", name: "Release notes", owner: "M. Chen", status: "In review", words: 860 },
  { id: "DOC-1043", name: "Support playbook", owner: "J. Patel", status: "Draft", words: 2130 },
  { id: "DOC-1044", name: "Security policy", owner: "L. Novak", status: "Published", words: 1975 },
];

const statusVariant: Record<Document["status"], BadgeVariant> = {
  Published: "success",
  "In review": "warning",
  Draft: "muted",
};

const rollup = [
  {
    region: "Europe",
    owner: "A. Rivera",
    documents: 128,
    words: 240510,
    updated: "14 Feb 2026",
    cadence: "Monthly",
  },
  {
    region: "North America",
    owner: "M. Chen",
    documents: 214,
    words: 418900,
    updated: "12 Feb 2026",
    cadence: "Weekly",
  },
  {
    region: "Asia Pacific",
    owner: "J. Patel",
    documents: 96,
    words: 155280,
    updated: "09 Feb 2026",
    cadence: "Monthly",
  },
];

export function Tables() {
  const [selected, setSelected] = createSignal<string[]>([]);
  const totalWords = () => documents.reduce((sum, document) => sum + document.words, 0);

  return (
    <>
      <Example
        title="Documents table"
        description="Named parts map to native table elements: Table renders the table, TableWrap keeps it from overflowing, and TableHeader, TableBody, TableRow, TableColumnHeader, and TableCell describe the structure. TableCell accepts code and number variants, and a selected row is highlighted through aria-selected."
        code={`const [selected, setSelected] = createSignal<string[]>([]);

<TableWrap role="region" aria-label="Example documents" tabIndex={0}>
  <Table>
    <TableCaption class="sb-text-caption">Fictional documents</TableCaption>
    <TableHeader>
      <TableRow>
        <TableColumnHeader>ID</TableColumnHeader>
        <TableColumnHeader>Document</TableColumnHeader>
        <TableColumnHeader>Status</TableColumnHeader>
        <TableColumnHeader>Words</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      <For each={documents}>
        {(document) => (
          <TableRow aria-selected={selected().includes(document.id)}>
            <TableCell variant="code">{document.id}</TableCell>
            <TableCell>{document.name}</TableCell>
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
        <TableCell colspan={3}>Total</TableCell>
        <TableCell variant="number">{totalWords().toLocaleString()}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</TableWrap>`}
      >
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
                  <TableCell variant="number">{totalWords().toLocaleString()}</TableCell>
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
      </Example>
      <Example
        title="Row headers and scrolling"
        description="The stylesheet gives the table a minimum width, so a wide table scrolls inside TableWrap. Give the wrapper role=region, tabIndex=0, and an accessible name so keyboard users can reach the scroll area. RowHeader defaults to scope=row and ColumnHeader to scope=col."
        code={`<TableWrap
  role="region"
  aria-label="Example regional rollup"
  tabIndex={0}
  style={{ "max-width": "360px" }}
>
  <Table>
    <TableCaption class="sb-text-caption">Fictional regional rollup</TableCaption>
    <TableHeader>
      <TableRow>
        <TableColumnHeader>Region</TableColumnHeader>
        <TableColumnHeader>Documents</TableColumnHeader>
        <TableColumnHeader>Words</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      <For each={rollup}>
        {(row) => (
          <TableRow>
            <TableRowHeader>{row.region}</TableRowHeader>
            <TableCell variant="number">{row.documents}</TableCell>
            <TableCell variant="number">{row.words.toLocaleString()}</TableCell>
          </TableRow>
        )}
      </For>
    </TableBody>
  </Table>
</TableWrap>`}
      >
        <div class="preview-stack">
          <TableWrap
            role="region"
            aria-label="Example regional rollup"
            tabIndex={0}
            style={{ "max-width": "360px" }}
          >
            <Table>
              <TableCaption class="sb-text-caption">Fictional regional rollup</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableColumnHeader>Region</TableColumnHeader>
                  <TableColumnHeader>Owner</TableColumnHeader>
                  <TableColumnHeader>Documents</TableColumnHeader>
                  <TableColumnHeader>Words</TableColumnHeader>
                  <TableColumnHeader>Updated</TableColumnHeader>
                  <TableColumnHeader>Cadence</TableColumnHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                <For each={rollup}>
                  {(row) => (
                    <TableRow>
                      <TableRowHeader>{row.region}</TableRowHeader>
                      <TableCell>{row.owner}</TableCell>
                      <TableCell variant="number">{row.documents}</TableCell>
                      <TableCell variant="number">{row.words.toLocaleString()}</TableCell>
                      <TableCell>{row.updated}</TableCell>
                      <TableCell>{row.cadence}</TableCell>
                    </TableRow>
                  )}
                </For>
              </TableBody>
            </Table>
          </TableWrap>
          <p class="preview-status" role="status">
            Scroll the specimen sideways to reach the Cadence column.
          </p>
        </div>
      </Example>
      <Api
        rows={[
          [
            "Table",
            "id, class, native table props",
            "Renders the native table with the sb-table class. Accepts every table attribute, including aria-label and aria-describedby.",
          ],
          [
            "TableWrap",
            "role, tabIndex, class",
            "Optional scroll container with the sb-table-wrap class. Set role=region, an accessible name, and tabIndex=0 when the table can overflow so keyboard users can scroll it.",
          ],
          [
            "TableCaption",
            "caption text",
            "Renders the table caption. Add sb-text-caption for the muted caption type style.",
          ],
          [
            "TableHeader / TableBody / TableFooter",
            "thead / tbody / tfoot",
            "Section parts that map to native elements. They add no class of their own; the stylesheet targets them through Root.",
          ],
          [
            "TableRow",
            "tr attributes",
            "Accepts aria-selected, which the stylesheet uses to highlight a selected row. Cells align to the middle of the row.",
          ],
          [
            "TableColumnHeader / TableRowHeader",
            "th attributes",
            "Column headers default to scope=col and row headers to scope=row; pass scope to override. Both accept colspan, rowspan, abbr, and other th attributes.",
          ],
          [
            "TableCell",
            "td attributes + variant",
            "Body cells. variant=code and variant=number set data-variant, which the stylesheet styles as a code or right-aligned numeric cell.",
          ],
          [
            "Styles",
            "@simple-base/css/table",
            "Included in the main stylesheet. The native .sb-table pattern remains available for plain HTML; the component reuses the same classes.",
          ],
        ]}
      />
    </>
  );
}
