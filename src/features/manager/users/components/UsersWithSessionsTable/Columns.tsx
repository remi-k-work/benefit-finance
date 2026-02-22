"use client";

// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// services, features, and other libraries
import { createColumnHelper } from "@tanstack/react-table";

// components
import ImageHeader from "./headers/Image";
import NameAndEmailHeader from "./headers/NameAndEmail";
import VerifiedHeader from "./headers/Verified";
import CreatedAndUpdatedHeader from "./headers/CreatedAndUpdated";
import RoleHeader from "./headers/Role";
import ActionsHeader from "./headers/Actions";

import ImageCell from "./cells/Image";
import NameAndEmailCell from "./cells/NameAndEmail";
import VerifiedCell from "./cells/Verified";
import CreatedAndUpdatedCell from "./cells/CreatedAndUpdated";
import RoleCell from "./cells/Role";
import ActionsCell from "./cells/Actions";

// types
import type LangLoader from "@/lib/LangLoader";
import type { ColumnDef } from "@tanstack/react-table";

const columnHelper = createColumnHelper<AllUsersWithSessions>();

export const columns = (
  ll: typeof LangLoader.prototype.manUsers,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
): ColumnDef<AllUsersWithSessions>[] =>
  [
    columnHelper.accessor("name", { sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),
    columnHelper.accessor("email", { sortingFn: "alphanumericCaseSensitive", filterFn: "equalsString" }),
    columnHelper.accessor("emailVerified", {}),
    columnHelper.accessor("createdAt", { sortingFn: "datetime" }),
    columnHelper.accessor("updatedAt", { sortingFn: "datetime" }),
    columnHelper.accessor("role", { filterFn: "equalsString" }),

    columnHelper.display({
      id: "imageColumn",
      header: () => <ImageHeader />,
      cell: ({ row }) => <ImageCell row={row} />,
    }),
    columnHelper.display({
      id: "nameAndEmailColumn",
      header: ({ table }) => <NameAndEmailHeader table={table} ll={ll} />,
      cell: ({ row }) => <NameAndEmailCell row={row} ll={ll} />,
    }),
    columnHelper.display({
      id: "VerifiedColumn",
      header: ({ table }) => <VerifiedHeader table={table} ll={ll} />,
      cell: ({ row }) => <VerifiedCell row={row} />,
    }),
    columnHelper.display({
      id: "createdAndUpdatedColumn",
      header: ({ table }) => <CreatedAndUpdatedHeader table={table} ll={ll} />,
      cell: ({ row }) => <CreatedAndUpdatedCell row={row} />,
    }),
    columnHelper.display({
      id: "roleColumn",
      header: ({ table }) => <RoleHeader table={table} ll={ll} />,
      cell: ({ row, table }) => <RoleCell row={row} table={table} ll={ll} llFormToastFeedback={llFormToastFeedback} />,
    }),
    columnHelper.display({
      id: "actionsColumn",
      header: () => <ActionsHeader />,
      cell: ({ row, table }) => <ActionsCell row={row} table={table} ll={ll} llFormToastFeedback={llFormToastFeedback} />,
    }),
  ] as ColumnDef<AllUsersWithSessions, unknown>[];
