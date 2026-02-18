// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
import type { Row } from "@tanstack/react-table";

interface RoleCellProps {
  row: Row<AllUsersWithSessions>;
}

export default function RoleCell({ row: { getValue } }: RoleCellProps) {
  return <TableCell className="text-center">{getValue("role")}</TableCell>;
}

export function RoleCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse" />
    </TableCell>
  );
}
