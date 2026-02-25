// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface StatusHeaderProps {
  table: Table<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
}

export default function StatusHeader({ table: { getColumn }, ll }: StatusHeaderProps) {
  return (
    <TableHead className="w-48">
      <ColumnHeader column={getColumn("status")!} title={ll["Status"]} className="mx-auto" />
    </TableHead>
  );
}

export function StatusHeaderSkeleton() {
  return (
    <TableHead className="w-48">
      <ColumnHeaderSkeleton title="Status" className="mx-auto" />
    </TableHead>
  );
}
