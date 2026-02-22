/* eslint-disable react-hooks/incompatible-library */

// react
import { useState as useStateReact } from "react";

// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// services, features, and other libraries
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useSkipper from "@/hooks/useSkipper";
import useState from "./useState";
import useActions from "./useActions";

// components
import { columns } from "@/features/manager/users/components/UsersWithSessionsTable/Columns";

// types
import type { RowData } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: keyof TData, value: unknown) => void;
    removeData: (rowIndex: number) => void;
  }
}

export default function useInstance(
  allUsersWithSessions: AllUsersWithSessions[],
  ll: typeof LangLoader.prototype.manUsers,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  const [data, setData] = useStateReact(allUsersWithSessions);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable<AllUsersWithSessions>({
    columns: columns(ll, llFormToastFeedback),
    data,
    autoResetPageIndex: autoResetPageIndex(),
    getRowCanExpand: (row) => row.original.sessions.length > 0 || row.original.accounts.length > 0,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    initialState: { columnVisibility: { name: false, email: false, emailVerified: false, createdAt: false, updatedAt: false, role: false } },
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
