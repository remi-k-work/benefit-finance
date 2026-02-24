// react
import { useCallback } from "react";

// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";

// types
import type { Table } from "@tanstack/react-table";

export default function useActions(table: Table<AllLeadsForReferrer>) {
  const browsedAll = useCallback(() => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
  }, [table]);

  return { browsedAll };
}
