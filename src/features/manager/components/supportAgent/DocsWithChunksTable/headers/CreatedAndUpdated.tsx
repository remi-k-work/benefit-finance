// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";

interface CreatedAndUpdatedHeaderProps {
  table: Table<AllDocsWithChunks>;
}

export default function CreatedAndUpdatedHeader({ table: { getColumn } }: CreatedAndUpdatedHeaderProps) {
  return (
    <TableHead className="w-64">
      <ColumnHeader column={getColumn("createdAt")!} title="Created At" className="mx-auto" />
      <br />
      <ColumnHeader column={getColumn("updatedAt")!} title="Updated At" className="mx-auto" />
    </TableHead>
  );
}

export function CreatedAndUpdatedHeaderSkeleton() {
  return (
    <TableHead className="w-64">
      <ColumnHeaderSkeleton title="Created At" className="mx-auto" />
      <br />
      <ColumnHeaderSkeleton title="Updated At" className="mx-auto" />
    </TableHead>
  );
}
