// react
import { startTransition, useState } from "react";

// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// services, features, and other libraries
import { Effect } from "effect";
import { runRpcActionMain } from "@/lib/helpersEffectClient";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { RpcUsersClient } from "@/features/users/rpc/client";
import { useSetUserRoleFeedback } from "@/features/users/hooks/feedbacks";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/custom/select";

// types
import type { Row, Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";
import type { Role } from "@/services/better-auth/auth";
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

interface RoleCellProps {
  row: Row<AllUsersWithSessions>;
  table: Table<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.users;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { ROLES } from "@/features/users/constants";

const main = (userId: string, newRole: Role) =>
  Effect.gen(function* () {
    const { setUserRole } = yield* RpcUsersClient;

    const result = yield* setUserRole({ userId, newRole }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function RoleCell({
  row: {
    index: rowIndex,
    original: { id: userId },
    getValue,
  },
  table: { options },
  ll,
  llFormToastFeedback,
}: RoleCellProps) {
  // This action establishes a new role for a user
  const [setUserRoleState, setSetUserRoleState] = useState<ActionResultWithFormState>({ ...initialFormState, actionStatus: "idle" });
  const [setUserRoleIsPending, setSetUserRoleIsPending] = useState(false);

  // Provide feedback to the user regarding this server action
  useSetUserRoleFeedback(setUserRoleState, ll, llFormToastFeedback);

  return (
    <TableCell className="text-center">
      <Select<Role>
        items={ROLES(ll)}
        value={getValue("role")}
        onValueChange={async (newRole) => {
          // Proceed only if the new role is different from the current one
          if (!newRole || newRole === getValue("role")) return;

          // Execute the server action first and capture its result
          setSetUserRoleIsPending(true);
          const actionResult = await runRpcActionMain(main(userId, newRole));
          setSetUserRoleState(actionResult);
          setSetUserRoleIsPending(false);

          // Only reflect changes in the UI if the action was successful
          if (actionResult.actionStatus !== "succeeded") return;
          startTransition(() => {
            options.meta?.updateData(rowIndex, "role", newRole);
            options.meta?.updateData(rowIndex, "updatedAt", new Date());
          });
        }}
        disabled={setUserRoleIsPending}
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
