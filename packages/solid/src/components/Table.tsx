import { splitProps, type JSX } from "solid-js";
import { cn } from "../cn";
import type { TableCellOptions } from "@simple-base/contracts";
export type { TableCellVariant } from "@simple-base/contracts";

export type TableRootProps = JSX.HTMLAttributes<HTMLTableElement>;

export function Table(props: TableRootProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <table {...rest} class={cn("sb-table", local.class)} />;
}

export type TableWrapProps = JSX.HTMLAttributes<HTMLDivElement>;

export function TableWrap(props: TableWrapProps) {
  const [local, rest] = splitProps(props, ["class"]);

  return <div {...rest} class={cn("sb-table-wrap", local.class)} />;
}

export type TableCaptionProps = JSX.CaptionHTMLAttributes<HTMLTableCaptionElement>;

export function TableCaption(props: TableCaptionProps) {
  return <caption {...props} />;
}

export type TableHeaderProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

export function TableHeader(props: TableHeaderProps) {
  return <thead {...props} />;
}

export type TableBodyProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

export function TableBody(props: TableBodyProps) {
  return <tbody {...props} />;
}

export type TableFooterProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

export function TableFooter(props: TableFooterProps) {
  return <tfoot {...props} />;
}

export type TableRowProps = JSX.HTMLAttributes<HTMLTableRowElement>;

export function TableRow(props: TableRowProps) {
  return <tr {...props} />;
}

export type TableColumnHeaderProps = JSX.ThHTMLAttributes<HTMLTableCellElement>;

export function TableColumnHeader(props: TableColumnHeaderProps) {
  const [local, rest] = splitProps(props, ["scope"]);

  return <th {...rest} scope={local.scope ?? "col"} />;
}

export type TableRowHeaderProps = JSX.ThHTMLAttributes<HTMLTableCellElement>;

export function TableRowHeader(props: TableRowHeaderProps) {
  const [local, rest] = splitProps(props, ["scope"]);

  return <th {...rest} scope={local.scope ?? "row"} />;
}

export type TableCellProps = JSX.TdHTMLAttributes<HTMLTableCellElement> & TableCellOptions;

export function TableCell(props: TableCellProps) {
  const [local, rest] = splitProps(props, ["variant"]);

  return <td {...rest} data-variant={local.variant} />;
}
