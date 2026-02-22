// react
import { startTransition, useState } from "react";

// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// server actions and mutations
import setUserRole from "@/features/manager/users/actions/setUserRole";

// services, features, and other libraries
import { initialFormState } from "@tanstack/react-form-nextjs";
import useSetUserRoleFeedback from "@/features/manager/users/hooks/feedbacks/useSetUserRole";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Badge } from "@/components/ui/custom/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/custom/select";

// types
import type { Row, Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";
import type { Role } from "@/services/better-auth/auth";
import type { ReactNode } from "react";
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

interface RoleCellProps {
  row: Row<AllUsersWithSessions>;
  table: Table<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.manUsers;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
const roles = [
  { value: "user", label: <Badge className="min-w-32 text-base font-semibold">User</Badge> },
  {
    value: "admin",
    label: (
      <Badge variant="destructive" className="min-w-32 text-base font-semibold">
        Admin
      </Badge>
    ),
  },
  {
    value: "demo",
    label: (
      <Badge variant="secondary" className="min-w-32 text-base font-semibold">
        Demo
      </Badge>
    ),
  },
] satisfies { value: Role; label: ReactNode }[];

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
        items={roles}
        value={getValue("role")}
        onValueChange={async (newRole) => {
          // Proceed only if the new role is different from the current one
          if (!newRole || newRole === getValue("role")) return;

          // Execute the server action first and capture its result
          setSetUserRoleIsPending(true);
          const actionResult = await setUserRole(userId, newRole);
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
            {roles.map(({ value, label }) => (
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
