// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { XCircleIcon } from "@heroicons/react/24/outline";

// types
import type { Row } from "@tanstack/react-table";

interface ActionsCellProps {
  row: Row<AllDocsWithChunks>;
}

export default function ActionsCell({ row }: ActionsCellProps) {
  return (
    <TableCell>
      <Button type="button" size="icon" variant="destructive">
        <XCircleIcon className="size-9" />
      </Button>
    </TableCell>
  );
}

export function ActionsCellSkeleton() {
  return (
    <TableCell>
      <Button type="button" size="icon" variant="destructive" disabled>
        <XCircleIcon className="size-9" />
      </Button>
    </TableCell>
  );
}
