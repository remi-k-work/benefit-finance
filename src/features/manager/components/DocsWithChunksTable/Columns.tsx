"use client";

// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { createColumnHelper } from "@tanstack/react-table";

// components
import TitleHeader from "./headers/Title";
import CreatedAndUpdatedHeader from "./headers/CreatedAndUpdated";
import ActionsHeader from "./headers/Actions";
import TitleCell from "./cells/Title";
import CreatedAndUpdatedCell from "./cells/CreatedAndUpdated";
import ActionsCell from "./cells/Actions";

// types
import type { ColumnDef } from "@tanstack/react-table";

const columnHelper = createColumnHelper<AllDocsWithChunks>();

export const columns: ColumnDef<AllDocsWithChunks>[] = [
  columnHelper.accessor("title", { sortingFn: "alphanumericCaseSensitive", filterFn: "includesString" }),
  columnHelper.accessor("content", { filterFn: "includesString" }),
  columnHelper.accessor("createdAt", { sortingFn: "datetime" }),
  columnHelper.accessor("updatedAt", { sortingFn: "datetime" }),

  columnHelper.display({ id: "title", header: ({ table }) => <TitleHeader table={table} />, cell: ({ row }) => <TitleCell row={row} /> }),
  columnHelper.display({
    id: "createdAndUpdated",
    header: ({ table }) => <CreatedAndUpdatedHeader table={table} />,
    cell: ({ row }) => <CreatedAndUpdatedCell row={row} />,
  }),
  columnHelper.display({ id: "actions", header: () => <ActionsHeader />, cell: ({ row }) => <ActionsCell row={row} /> }),
] as ColumnDef<AllDocsWithChunks, unknown>[];
