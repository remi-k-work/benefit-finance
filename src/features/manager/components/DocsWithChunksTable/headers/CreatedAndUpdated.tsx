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
    <TableHead className="w-32 text-center">
      <ColumnHeader column={getColumn("createdAt")!} title="Created At" />
      <br />
      <ColumnHeader column={getColumn("updatedAt")!} title="Updated At" />
    </TableHead>
  );
}

export function CreatedAndUpdatedHeaderSkeleton() {
  return (
    <TableHead className="w-32 text-center">
      <ColumnHeaderSkeleton title="Created At" />
      <br />
      <ColumnHeaderSkeleton title="Updated At" />
    </TableHead>
  );
}
