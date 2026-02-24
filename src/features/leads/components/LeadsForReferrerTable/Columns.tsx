"use client";

// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";

// services, features, and other libraries
import { createColumnHelper } from "@tanstack/react-table";

// components
import NameHeader from "./headers/Name";
import StatusHeader from "./headers/Status";
import SubmittedHeader from "./headers/Submitted";

import NameCell from "./cells/Name";
import StatusCell from "./cells/Status";
import SubmittedCell from "./cells/Submitted";

// types
import type LangLoader from "@/lib/LangLoader";
import type { ColumnDef } from "@tanstack/react-table";

const columnHelper = createColumnHelper<AllLeadsForReferrer>();

export const columns = (ll: typeof LangLoader.prototype.leads): ColumnDef<AllLeadsForReferrer>[] =>
  [
    columnHelper.accessor((row) => row.firstName + " " + row.lastName, { id: "name", sortingFn: "alphanumericCaseSensitive", filterFn: "includesString" }),
    columnHelper.accessor("email", { sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),
    columnHelper.accessor("phone", { filterFn: "equalsString" }),
    columnHelper.accessor("serviceOfInterest", { filterFn: "equalsString" }),
    columnHelper.accessor("status", { filterFn: "equalsString" }),
    columnHelper.accessor("createdAt", { sortingFn: "datetime" }),

    columnHelper.display({
      id: "nameColumn",
      header: ({ table }) => <NameHeader table={table} ll={ll} />,
      cell: ({ row }) => <NameCell row={row} ll={ll} />,
    }),
    columnHelper.display({
      id: "statusColumn",
      header: ({ table }) => <StatusHeader table={table} ll={ll} />,
      cell: ({ row }) => <StatusCell row={row} ll={ll} />,
    }),
    columnHelper.display({
      id: "submittedColumn",
      header: ({ table }) => <SubmittedHeader table={table} ll={ll} />,
      cell: ({ row }) => <SubmittedCell row={row} />,
    }),
  ] as ColumnDef<AllLeadsForReferrer, unknown>[];
