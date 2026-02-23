// react
import { useCallback } from "react";

// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// types
import type { Table } from "@tanstack/react-table";

export default function useActions(table: Table<AllUsersWithSessions>) {
  const browsedAll = useCallback(() => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
  }, [table]);

  return { browsedAll };
}
