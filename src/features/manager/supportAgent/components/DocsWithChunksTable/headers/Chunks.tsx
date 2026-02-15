// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { TableHead } from "@/components/ui/custom/table";
import ColumnHeader, { ColumnHeaderSkeleton } from "@/components/ColumnHeader";

// types
import type { Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface ChunksHeaderProps {
  table: Table<AllDocsWithChunks>;
  ll: typeof LangLoader.prototype.manSupportAgent;
}

export default function ChunksHeader({ table: { getColumn }, ll }: ChunksHeaderProps) {
  return (
    <TableHead className="w-32">
      <ColumnHeader column={getColumn("chunkCount")!} title={ll["Chunks#"]} className="mx-auto" />
    </TableHead>
  );
}

export function ChunksHeaderSkeleton() {
  return (
    <TableHead className="w-32">
      <ColumnHeaderSkeleton title="Chunks#" className="mx-auto" />
    </TableHead>
  );
}
