/* eslint-disable react-hooks/incompatible-library */

// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// services, features, and other libraries
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import useState from "./useState";
import useActions from "./useActions";

// components
import { columns } from "@/features/manager/users/components/UsersWithSessionsTable/Columns";

// types
import type { Session } from "@/services/better-auth/auth";
import type LangLoader from "@/lib/LangLoader";

export default function useInstance(
  session: Session,
  data: AllUsersWithSessions[],
  ll: typeof LangLoader.prototype.manUsers,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  const table = useReactTable<AllUsersWithSessions>({
    columns: columns(session, ll, llFormToastFeedback),
    data,
    getRowCanExpand: (row) => row.original.sessions.length > 0 || row.original.accounts.length > 0,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),

    initialState: { columnVisibility: { name: false, email: false, emailVerified: false, createdAt: false, updatedAt: false, role: false } },
  });

  return { table, state: useState(table), actions: useActions(table) };
}
