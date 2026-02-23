// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface NameAndEmailHeaderProps {
  table: Table<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.manUsers;
}

export default function NameAndEmailHeader({ table: { getColumn }, ll }: NameAndEmailHeaderProps) {
  return (
    <TableHead className="w-80">
      <ColumnHeader column={getColumn("name")!} title={ll["Name"]} />
      <br />
      <ColumnHeader column={getColumn("email")!} title={ll["Email"]} />
    </TableHead>
  );
}

export function NameAndEmailHeaderSkeleton() {
  return (
    <TableHead className="w-80">
      <ColumnHeaderSkeleton title="Name" />
      <br />
      <ColumnHeaderSkeleton title="Email" />
    </TableHead>
  );
}
