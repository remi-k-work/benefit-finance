// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface NameHeaderProps {
  table: Table<AllLeadsForReferrer>;
  ll: typeof LangLoader.prototype.leads;
}

export default function NameHeader({ table: { getColumn }, ll }: NameHeaderProps) {
  return (
    <TableHead className="w-80">
      <ColumnHeader column={getColumn("name")!} title={ll["Name"]} />
    </TableHead>
  );
}

export function NameHeaderSkeleton() {
  return (
    <TableHead className="w-80">
      <ColumnHeaderSkeleton title="Name" />
    </TableHead>
  );
}
