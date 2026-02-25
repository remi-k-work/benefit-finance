// react
import { useCallback } from "react";

// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// types
import type { Table } from "@tanstack/react-table";

export default function useActions(table: Table<AllAvailableLeads>) {
  const browsedAll = useCallback(() => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
  }, [table]);

  return { browsedAll };
}
