/* eslint-disable react-hooks/incompatible-library */

// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useState from "./useState";
import useActions from "./useActions";

// components
import { columns } from "@/features/manager/components/DocsWithChunksTable/Columns";

export default function useInstance(data: AllDocsWithChunks[]) {
  const table = useReactTable<AllDocsWithChunks>({
    columns,
    data,
    getRowCanExpand: (row) => row.original.docChunks.length > 0,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: { columnVisibility: { title: false, content: false, createdAt: false, updatedAt: false } },
  });

  return { table, state: useState(table), actions: useActions(table) };
}
