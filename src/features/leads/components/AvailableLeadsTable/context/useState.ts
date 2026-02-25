// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// types
import type { Table } from "@tanstack/react-table";

export default function useState(table: Table<AllAvailableLeads>) {
  // Get the table's current state
  const state = table.getState();

  return {
    // Determine the total number of viewable items once all filters are applied
    totalItems: table.getFilteredRowModel().rows.length,

    keyword: state.globalFilter ?? "",

    // Are we in search mode?
    isSearchMode: !!state.globalFilter,

    // Has no filter been selected? In other words, are we browsing all of the items?
    isBrowsingAll: state.columnFilters.length === 0 && !state.globalFilter,

    currentPage: state.pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
  };
}
