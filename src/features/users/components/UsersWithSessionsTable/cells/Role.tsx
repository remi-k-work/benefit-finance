// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// services, features, and other libraries
import { Effect } from "effect";
import { Atom, useAtom } from "@effect-atom/atom-react";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form/hooks";
import { RpcUsersClient } from "@/features/users/rpc/client";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/custom/select";

// types
import type { Row, Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";
import type { Role } from "@/services/better-auth/auth";

interface RoleCellProps {
  row: Row<AllUsersWithSessions>;
  table: Table<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.users;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { ROLES } from "@/features/users/constants";

const setUserRoleActionAtom = Atom.family((userId: string) =>
  RuntimeAtom.fn(
    Effect.fnUntraced(function* ({ newRole, table: { options }, rowIndex }: { newRole: Role; table: Table<AllUsersWithSessions>; rowIndex: number }) {
      const { setUserRole } = yield* RpcUsersClient;
      yield* setUserRole({ userId, newRole });

      // Only reflect changes in the UI if the action was successful
      yield* Effect.sync(() => {
        options.meta?.updateData(rowIndex, "role", newRole);
        options.meta?.updateData(rowIndex, "updatedAt", new Date());
      });
    }),
  ),
);

export default function RoleCell({
  row: {
    index: rowIndex,
    original: { id: userId },
    getValue,
  },
  table,
  ll,
  llFormToastFeedback,
}: RoleCellProps) {
  // This action establishes a new role for a user
  const [setUserRoleResult, setUserRoleAction] = useAtom(setUserRoleActionAtom(userId));

  // Provide feedback to the user regarding this server action
  useSubmitToast(
    setUserRoleActionAtom(userId),
    llFormToastFeedback,
    ll["[SET USER ROLE]"],
    ll["The role has been set."],
    ll["The role could not be set; please try again later."],
  );

  return (
    <TableCell className="text-center">
      <Select<Role>
        items={ROLES(ll)}
        value={getValue("role")}
        disabled={setUserRoleResult.waiting}
        onValueChange={(newRole) => {
          // Proceed only if the new role is different from the current one
          if (!newRole || newRole === getValue("role")) return;
          setUserRoleAction({ newRole, table, rowIndex });
        }}
      >
        <SelectTrigger className="mx-auto w-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-fit">
          <SelectGroup>
            <SelectLabel>
              <p>{ll["Select a role for"]}</p>
              <p className="text-muted-foreground text-lg font-semibold">{getValue("name")}</p>
            </SelectLabel>
            {ROLES(ll).map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </TableCell>
  );
}

export function RoleCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse" />
    </TableCell>
  );
}
