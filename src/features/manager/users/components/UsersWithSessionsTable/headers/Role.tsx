// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface RoleHeaderProps {
  table: Table<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.manUsers;
}

export default function RoleHeader({ table: { getColumn }, ll }: RoleHeaderProps) {
  return (
    <TableHead className="w-42">
      <ColumnHeader column={getColumn("role")!} title={ll["Role"]} className="mx-auto" />
    </TableHead>
  );
}

export function RoleHeaderSkeleton() {
  return (
    <TableHead className="w-42">
      <ColumnHeaderSkeleton title="Role" className="mx-auto" />
    </TableHead>
  );
}
