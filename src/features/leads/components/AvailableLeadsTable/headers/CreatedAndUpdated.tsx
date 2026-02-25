// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface CreatedAndUpdatedHeaderProps {
  table: Table<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
}

export default function CreatedAndUpdatedHeader({ table: { getColumn }, ll }: CreatedAndUpdatedHeaderProps) {
  return (
    <TableHead className="w-72">
      <ColumnHeader column={getColumn("createdAt")!} title={ll["Created At"]} className="mx-auto" />
      <br />
      <ColumnHeader column={getColumn("updatedAt")!} title={ll["Updated At"]} className="mx-auto" />
    </TableHead>
  );
}

export function CreatedAndUpdatedHeaderSkeleton() {
  return (
    <TableHead className="w-72">
      <ColumnHeaderSkeleton title="Created At" className="mx-auto" />
      <br />
      <ColumnHeaderSkeleton title="Updated At" className="mx-auto" />
    </TableHead>
  );
}
