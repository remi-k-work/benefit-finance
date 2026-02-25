// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// services, features, and other libraries
import { DateTime } from "effect";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
import type { Row } from "@tanstack/react-table";

interface CreatedAndUpdatedCellProps {
  row: Row<AllAvailableLeads>;
}

export default function CreatedAndUpdatedCell({ row: { getValue } }: CreatedAndUpdatedCellProps) {
  return (
    <TableCell className="text-center">
      {DateTime.formatLocal(DateTime.unsafeFromDate(getValue("createdAt")), {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
      <br />
      {DateTime.formatLocal(DateTime.unsafeFromDate(getValue("updatedAt")), {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </TableCell>
  );
}

export function CreatedAndUpdatedCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-32 animate-pulse" />
      <div className="bg-background mx-auto h-5 w-32 animate-pulse" />
    </TableCell>
  );
}
