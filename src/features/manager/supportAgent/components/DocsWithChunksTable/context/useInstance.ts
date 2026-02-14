/* eslint-disable react-hooks/incompatible-library */

// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useState from "./useState";
import useActions from "./useActions";

// components
import { columns } from "@/features/manager/supportAgent/components/DocsWithChunksTable/Columns";

// types
import type LangLoader from "@/lib/LangLoader";

export default function useInstance(data: AllDocsWithChunks[], ll: typeof LangLoader.prototype.manSupportAgent) {
  const table = useReactTable<AllDocsWithChunks>({
    columns: columns(ll),
    data,
    getRowCanExpand: (row) => row.original.docChunks.length > 0,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    initialState: { columnVisibility: { title: false, content: false, createdAt: false, updatedAt: false } },
  });

  return { table, state: useState(table), actions: useActions(table) };
}
