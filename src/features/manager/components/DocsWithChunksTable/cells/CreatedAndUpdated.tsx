// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { DateTime } from "effect";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
import type { Row } from "@tanstack/react-table";

interface CreatedAndUpdatedCellProps {
  row: Row<AllDocsWithChunks>;
}

export default function CreatedAndUpdatedCell({ row: { getValue } }: CreatedAndUpdatedCellProps) {
  return (
    <TableCell className="text-center">
      {DateTime.formatLocal(DateTime.unsafeFromDate(getValue("createdAt")))}
      <br />
      {DateTime.formatLocal(DateTime.unsafeFromDate(getValue("updatedAt")))}
    </TableCell>
  );
}

export function CreatedAndUpdatedCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-16 animate-pulse" />
      <div className="bg-background mx-auto h-5 w-16 animate-pulse" />
    </TableCell>
  );
}
