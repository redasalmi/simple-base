import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableRowHeader,
  TableWrap,
} from "@simple-base/solid";
import { For } from "solid-js";

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

export default function RowHeaders() {
  return (
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
  );
}
