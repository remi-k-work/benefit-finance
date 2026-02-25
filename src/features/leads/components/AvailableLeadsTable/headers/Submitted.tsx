// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface SubmittedHeaderProps {
  table: Table<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
}

export default function SubmittedHeader({ table: { getColumn }, ll }: SubmittedHeaderProps) {
  return (
    <TableHead className="w-72">
      <ColumnHeader column={getColumn("createdAt")!} title={ll["Submitted"]} className="mx-auto" />
    </TableHead>
  );
}

export function SubmittedHeaderSkeleton() {
  return (
    <TableHead className="w-72">
      <ColumnHeaderSkeleton title="Submitted" className="mx-auto" />
    </TableHead>
  );
}
