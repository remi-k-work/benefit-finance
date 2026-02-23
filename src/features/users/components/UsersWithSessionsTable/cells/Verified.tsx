// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// components
import { TableCell } from "@/components/ui/custom/table";

// assets
import { CheckIcon } from "@heroicons/react/24/outline";

// types
import type { Row } from "@tanstack/react-table";

interface VerifiedCellProps {
  row: Row<AllUsersWithSessions>;
}

export default function VerifiedCell({ row: { getValue } }: VerifiedCellProps) {
  return <TableCell className="text-center">{getValue("emailVerified") ? <CheckIcon className="mx-auto size-9" /> : null}</TableCell>;
}

export function VerifiedCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse" />
    </TableCell>
  );
}
