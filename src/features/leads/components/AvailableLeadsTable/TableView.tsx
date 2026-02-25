"use client";

// react
import { Fragment } from "react";

// services, features, and other libraries
import { flexRender } from "@tanstack/react-table";
import { useInstanceContext } from "./context";

// components
import InfoLine from "@/components/Form/InfoLine";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/custom/table";
import { NameHeaderSkeleton } from "./headers/Name";
import { StatusHeaderSkeleton } from "./headers/Status";
import { SubmittedHeaderSkeleton } from "./headers/Submitted";
import { NameCellSkeleton } from "./cells/Name";
import { StatusCellSkeleton } from "./cells/Status";
import { SubmittedCellSkeleton } from "./cells/Submitted";
import LeadManager from "@/features/leads/components/LeadManager";

export default function TableView() {
  const {
    ll,
    table,
    state: { totalItems },
  } = useInstanceContext();

  if (totalItems === 0) return <InfoLine message={ll["No leads have been found!"]} className="justify-center px-6 py-9 text-xl" />;

  return (
    <Table>
      <TableHeader className="from-background to-secondary bg-linear-to-r font-sans">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Fragment key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <TableRow data-state={row.getIsSelected() && "selected"} className="odd:bg-background even:bg-muted">
              {row.getVisibleCells().map((cell) => (
                <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>
              ))}
            </TableRow>

            {/* If the row is expanded, render the expanded UI as a separate row with a single cell that spans the width of the table */}
            {row.getIsExpanded() && (
              <TableRow>
                <TableCell colSpan={row.getVisibleCells().length}>
                  <LeadManager allAvailableLeads={row.original} />
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableViewSkeleton() {
  return (
    <Table>
      <TableHeader className="from-background to-secondary bg-linear-to-r font-sans">
        <TableRow>
          <NameHeaderSkeleton />
          <StatusHeaderSkeleton />
          <SubmittedHeaderSkeleton />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 6 }).map((_, index) => (
          <TableRow key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted"}>
            <NameCellSkeleton />
            <StatusCellSkeleton />
            <SubmittedCellSkeleton />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
