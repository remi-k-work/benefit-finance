"use client";

// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { createColumnHelper } from "@tanstack/react-table";

// components
import TitleHeader from "./headers/NameAndEmail";
import CreatedAndUpdatedHeader from "./headers/CreatedAndUpdated";
import ChunksHeader from "./headers/Verified";
import ActionsHeader from "./headers/Actions";
import TitleCell from "./cells/NameAndEmail";
import CreatedAndUpdatedCell from "./cells/CreatedAndUpdated";
import ChunksCell from "./cells/Verified";
import ActionsCell from "./cells/Actions";

// types
import type LangLoader from "@/lib/LangLoader";
import type { ColumnDef } from "@tanstack/react-table";

const columnHelper = createColumnHelper<AllDocsWithChunks>();

export const columns = (
  ll: typeof LangLoader.prototype.manSupportAgent,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
): ColumnDef<AllDocsWithChunks>[] =>
  [
    columnHelper.accessor("title", { sortingFn: "alphanumeric", filterFn: "includesString" }),
    columnHelper.accessor("content", { filterFn: "includesString" }),
    columnHelper.accessor("createdAt", { sortingFn: "datetime" }),
    columnHelper.accessor("updatedAt", { sortingFn: "datetime" }),
    columnHelper.accessor("chunkCount", {}),

    columnHelper.display({
      id: "titleColumn",
      header: ({ table }) => <TitleHeader table={table} ll={ll} />,
      cell: ({ row }) => <TitleCell row={row} ll={ll} />,
    }),
    columnHelper.display({
      id: "createdAndUpdatedColumn",
      header: ({ table }) => <CreatedAndUpdatedHeader table={table} ll={ll} />,
      cell: ({ row }) => <CreatedAndUpdatedCell row={row} />,
    }),
    columnHelper.display({ id: "chunksColumn", header: ({ table }) => <ChunksHeader table={table} ll={ll} />, cell: ({ row }) => <ChunksCell row={row} /> }),
    columnHelper.display({
      id: "actionsColumn",
      header: () => <ActionsHeader />,
      cell: ({ row }) => <ActionsCell row={row} ll={ll} llFormToastFeedback={llFormToastFeedback} />,
    }),
  ] as ColumnDef<AllDocsWithChunks, unknown>[];
