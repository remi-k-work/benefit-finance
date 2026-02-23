// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
import type { Row } from "@tanstack/react-table";

interface ChunksCellProps {
  row: Row<AllDocsWithChunks>;
}

export default function ChunksCell({ row: { getValue } }: ChunksCellProps) {
  return <TableCell className="text-center">{getValue("chunkCount")}</TableCell>;
}

export function ChunksCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse" />
    </TableCell>
  );
}
