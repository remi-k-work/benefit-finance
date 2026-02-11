// react
import { useCallback } from "react";

// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// types
import type { Table } from "@tanstack/react-table";

export default function useActions(table: Table<AllDocsWithChunks>) {
  const browsedAll = useCallback(() => {
    table.resetGlobalFilter();
    table.resetColumnFilters();
  }, [table]);

  return { browsedAll };
}
