/* eslint-disable react-hooks/incompatible-library */

// react
import { useState as useStateReact } from "react";

// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";

// services, features, and other libraries
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useSkipper from "@/hooks/useSkipper";
import useState from "./useState";
import useActions from "./useActions";

// components
import { columns } from "@/features/leads/components/LeadsForReferrerTable/Columns";

// types
import type { RowData } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: keyof TData, value: unknown) => void;
    removeData: (rowIndex: number) => void;
  }
}

export default function useInstance(allLeadsForReferrer: AllLeadsForReferrer[], ll: typeof LangLoader.prototype.leads) {
  const [data, setData] = useStateReact(allLeadsForReferrer);
  const [prevData, setPrevData] = useStateReact(allLeadsForReferrer);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // Check if the incoming prop is different from the last one we saw
  if (allLeadsForReferrer !== prevData) {
    // Skip page index reset until after next re-render
    skipAutoResetPageIndex();

    setPrevData(allLeadsForReferrer); // Keep track of the "latest" prop
    setData(allLeadsForReferrer); // Sync the actual table data
  }

  const table = useReactTable<AllLeadsForReferrer>({
    columns: columns(ll),
    data,
    autoResetPageIndex: autoResetPageIndex(),
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    initialState: { columnVisibility: { name: false, email: false, phone: false, serviceOfInterest: false, status: false, createdAt: false } },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next re-render
        skipAutoResetPageIndex();
        setData((old) => old.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row)));
      },
      removeData: (rowIndex) => {
        // Skip page index reset until after next re-render
        skipAutoResetPageIndex();
        setData((old) => old.filter((_, index) => index !== rowIndex));

        // If the last row on the last page is deleted, move back to the previous page
        if (table.getRowModel().rows.length === 1 && table.getCanPreviousPage()) table.previousPage();
      },
    },
  });

  return { table, state: useState(table), actions: useActions(table) };
}
