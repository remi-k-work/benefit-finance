// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface TitleHeaderProps {
  table: Table<AllDocsWithChunks>;
  ll: typeof LangLoader.prototype.manSupportAgent;
}

export default function TitleHeader({ table: { getColumn }, ll }: TitleHeaderProps) {
  return (
    <TableHead className="w-80">
      <ColumnHeader column={getColumn("title")!} title={ll["Title"]} />
    </TableHead>
  );
}

export function TitleHeaderSkeleton() {
  return (
    <TableHead className="w-80">
      <ColumnHeaderSkeleton title="Title" />
    </TableHead>
  );
}
