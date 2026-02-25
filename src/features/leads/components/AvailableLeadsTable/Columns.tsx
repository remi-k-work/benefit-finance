"use client";

// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// services, features, and other libraries
import { createColumnHelper } from "@tanstack/react-table";

// components
import NameAndReferrerHeader from "./headers/NameAndReferrer";
import StatusHeader from "./headers/Status";
import CreatedAndUpdatedHeader from "./headers/CreatedAndUpdated";

import NameAndReferrerCell from "./cells/NameAndReferrer";
import StatusCell from "./cells/Status";
import CreatedAndUpdatedCell from "./cells/CreatedAndUpdated";

// types
import type LangLoader from "@/lib/LangLoader";
import type { ColumnDef } from "@tanstack/react-table";

const columnHelper = createColumnHelper<AllAvailableLeads>();

export const columns = (
  ll: typeof LangLoader.prototype.leads,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
): ColumnDef<AllAvailableLeads>[] =>
  [
    columnHelper.accessor((row) => row.firstName + " " + row.lastName, { id: "name", sortingFn: "alphanumericCaseSensitive", filterFn: "includesString" }),
    columnHelper.accessor("email", { sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),
    columnHelper.accessor("phone", { filterFn: "equalsString" }),
    columnHelper.accessor("serviceOfInterest", { filterFn: "equalsString" }),
    columnHelper.accessor("status", { filterFn: "equalsString" }),
    columnHelper.accessor("internalNotes", { filterFn: "includesString" }),
    columnHelper.accessor("createdAt", { sortingFn: "datetime" }),
    columnHelper.accessor("updatedAt", { sortingFn: "datetime" }),

    columnHelper.accessor("referrer.name", { id: "referrerName", sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),
    columnHelper.accessor("referrer.email", { id: "referrerEmail", sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),

    columnHelper.display({
      id: "nameColumn",
      header: ({ table }) => <NameAndReferrerHeader table={table} ll={ll} />,
      cell: ({ row }) => <NameAndReferrerCell row={row} ll={ll} />,
    }),
    columnHelper.display({
      id: "statusColumn",
      header: ({ table }) => <StatusHeader table={table} ll={ll} />,
      cell: ({ row, table }) => <StatusCell row={row} table={table} ll={ll} llFormToastFeedback={llFormToastFeedback} />,
    }),
    columnHelper.display({
      id: "submittedColumn",
      header: ({ table }) => <CreatedAndUpdatedHeader table={table} ll={ll} />,
      cell: ({ row }) => <CreatedAndUpdatedCell row={row} />,
    }),
  ] as ColumnDef<AllAvailableLeads, unknown>[];
