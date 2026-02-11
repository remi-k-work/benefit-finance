// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";

interface TitleHeaderProps {
  table: Table<AllDocsWithChunks>;
}

export default function TitleHeader({ table: { getColumn } }: TitleHeaderProps) {
  return (
    <TableHead className="w-80 text-center">
      <ColumnHeader column={getColumn("title")!} title="Title" />
    </TableHead>
  );
}

export function TitleHeaderSkeleton() {
  return (
    <TableHead className="w-80 text-center">
      <ColumnHeaderSkeleton title="Title" />
    </TableHead>
  );
}
