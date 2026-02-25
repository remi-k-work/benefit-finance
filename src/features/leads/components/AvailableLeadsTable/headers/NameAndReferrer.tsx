// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface NameAndReferrerHeaderProps {
  table: Table<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
}

export default function NameAndReferrerHeader({ table: { getColumn }, ll }: NameAndReferrerHeaderProps) {
  return (
    <TableHead className="w-80">
      <ColumnHeader column={getColumn("name")!} title={ll["Name"]} />
      <br />
      <ColumnHeader column={getColumn("referrerName")!} title={ll["Referrer"]} />
    </TableHead>
  );
}

export function NameAndReferrerHeaderSkeleton() {
  return (
    <TableHead className="w-80">
      <ColumnHeaderSkeleton title="Name" />
      <br />
      <ColumnHeaderSkeleton title="Referrer" />
    </TableHead>
  );
}
