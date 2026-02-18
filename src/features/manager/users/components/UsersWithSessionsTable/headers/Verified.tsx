// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface VerifiedHeaderProps {
  table: Table<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.manUsers;
}

export default function VerifiedHeader({ table: { getColumn }, ll }: VerifiedHeaderProps) {
  return (
    <TableHead className="w-36">
      <ColumnHeader column={getColumn("emailVerified")!} title={ll["Verified?"]} className="mx-auto" />
    </TableHead>
  );
}

export function VerifiedHeaderSkeleton() {
  return (
    <TableHead className="w-36">
      <ColumnHeaderSkeleton title="Verified?" className="mx-auto" />
    </TableHead>
  );
}
