import { For, createSignal } from "solid-js";
import { Badge, Checkbox, Table, type BadgeVariant } from "@simple-base/solid";
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
        description="Compound parts map to native table elements: Root renders the table, Wrap keeps it from overflowing, and Header, Body, Row, ColumnHeader, and Cell describe the structure. Cell accepts code and number variants, and a selected row is highlighted through aria-selected."
        code={`const [selected, setSelected] = createSignal<string[]>([]);

<Table.Wrap role="region" aria-label="Example documents" tabIndex={0}>
  <Table.Root>
    <Table.Caption class="sb-text-caption">Fictional documents</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>ID</Table.ColumnHeader>
        <Table.ColumnHeader>Document</Table.ColumnHeader>
        <Table.ColumnHeader>Status</Table.ColumnHeader>
        <Table.ColumnHeader>Words</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <For each={documents}>
        {(document) => (
          <Table.Row aria-selected={selected().includes(document.id)}>
            <Table.Cell variant="code">{document.id}</Table.Cell>
            <Table.Cell>{document.name}</Table.Cell>
            <Table.Cell>
              <Badge variant={statusVariant[document.status]}>{document.status}</Badge>
            </Table.Cell>
            <Table.Cell variant="number">{document.words.toLocaleString()}</Table.Cell>
          </Table.Row>
        )}
      </For>
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colspan={3}>Total</Table.Cell>
        <Table.Cell variant="number">{totalWords().toLocaleString()}</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table.Root>
</Table.Wrap>`}
      >
        <div class="preview-stack">
          <Table.Wrap role="region" aria-label="Example documents" tabIndex={0}>
            <Table.Root>
              <Table.Caption class="sb-text-caption">Fictional documents</Table.Caption>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Select</Table.ColumnHeader>
                  <Table.ColumnHeader>ID</Table.ColumnHeader>
                  <Table.ColumnHeader>Document</Table.ColumnHeader>
                  <Table.ColumnHeader>Owner</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Words</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <For each={documents}>
                  {(document) => (
                    <Table.Row aria-selected={selected().includes(document.id)}>
                      <Table.Cell>
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
                      </Table.Cell>
                      <Table.Cell variant="code">{document.id}</Table.Cell>
                      <Table.Cell>{document.name}</Table.Cell>
                      <Table.Cell>{document.owner}</Table.Cell>
                      <Table.Cell>
                        <Badge variant={statusVariant[document.status]}>{document.status}</Badge>
                      </Table.Cell>
                      <Table.Cell variant="number">{document.words.toLocaleString()}</Table.Cell>
                    </Table.Row>
                  )}
                </For>
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell>Total</Table.Cell>
                  <Table.Cell />
                  <Table.Cell />
                  <Table.Cell variant="number">{totalWords().toLocaleString()}</Table.Cell>
                </Table.Row>
              </Table.Footer>
            </Table.Root>
          </Table.Wrap>
          <p class="preview-status" role="status">
            {selected().length === 0
              ? "No rows selected."
              : `${selected().length} row(s) selected: ${selected().join(", ")}.`}
          </p>
        </div>
      </Example>
      <Example
        title="Row headers and scrolling"
        description="The stylesheet gives the table a minimum width, so a wide table scrolls inside Table.Wrap. Give the wrapper role=region, tabIndex=0, and an accessible name so keyboard users can reach the scroll area. RowHeader defaults to scope=row and ColumnHeader to scope=col."
        code={`<Table.Wrap
  role="region"
  aria-label="Example regional rollup"
  tabIndex={0}
  style={{ "max-width": "360px" }}
>
  <Table.Root>
    <Table.Caption class="sb-text-caption">Fictional regional rollup</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>Region</Table.ColumnHeader>
        <Table.ColumnHeader>Documents</Table.ColumnHeader>
        <Table.ColumnHeader>Words</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <For each={rollup}>
        {(row) => (
          <Table.Row>
            <Table.RowHeader>{row.region}</Table.RowHeader>
            <Table.Cell variant="number">{row.documents}</Table.Cell>
            <Table.Cell variant="number">{row.words.toLocaleString()}</Table.Cell>
          </Table.Row>
        )}
      </For>
    </Table.Body>
  </Table.Root>
</Table.Wrap>`}
      >
        <div class="preview-stack">
          <Table.Wrap
            role="region"
            aria-label="Example regional rollup"
            tabIndex={0}
            style={{ "max-width": "360px" }}
          >
            <Table.Root>
              <Table.Caption class="sb-text-caption">Fictional regional rollup</Table.Caption>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Region</Table.ColumnHeader>
                  <Table.ColumnHeader>Owner</Table.ColumnHeader>
                  <Table.ColumnHeader>Documents</Table.ColumnHeader>
                  <Table.ColumnHeader>Words</Table.ColumnHeader>
                  <Table.ColumnHeader>Updated</Table.ColumnHeader>
                  <Table.ColumnHeader>Cadence</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <For each={rollup}>
                  {(row) => (
                    <Table.Row>
                      <Table.RowHeader>{row.region}</Table.RowHeader>
                      <Table.Cell>{row.owner}</Table.Cell>
                      <Table.Cell variant="number">{row.documents}</Table.Cell>
                      <Table.Cell variant="number">{row.words.toLocaleString()}</Table.Cell>
                      <Table.Cell>{row.updated}</Table.Cell>
                      <Table.Cell>{row.cadence}</Table.Cell>
                    </Table.Row>
                  )}
                </For>
              </Table.Body>
            </Table.Root>
          </Table.Wrap>
          <p class="preview-status" role="status">
            Scroll the specimen sideways to reach the Cadence column.
          </p>
        </div>
      </Example>
      <Api
        rows={[
          [
            "Table.Root",
            "id, class, native table props",
            "Renders the native table with the sb-table class. Accepts every table attribute, including aria-label and aria-describedby.",
          ],
          [
            "Table.Wrap",
            "role, tabIndex, class",
            "Optional scroll container with the sb-table-wrap class. Set role=region, an accessible name, and tabIndex=0 when the table can overflow so keyboard users can scroll it.",
          ],
          [
            ".Caption",
            "caption text",
            "Renders the table caption. Add sb-text-caption for the muted caption type style.",
          ],
          [
            ".Header / .Body / .Footer",
            "thead / tbody / tfoot",
            "Section parts that map to native elements. They add no class of their own; the stylesheet targets them through Root.",
          ],
          [
            ".Row",
            "tr attributes",
            "Accepts aria-selected, which the stylesheet uses to highlight a selected row. Cells align to the middle of the row.",
          ],
          [
            ".ColumnHeader / .RowHeader",
            "th attributes",
            "Column headers default to scope=col and row headers to scope=row; pass scope to override. Both accept colspan, rowspan, abbr, and other th attributes.",
          ],
          [
            ".Cell",
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
