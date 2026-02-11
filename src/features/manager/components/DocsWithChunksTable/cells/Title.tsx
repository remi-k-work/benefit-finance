// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// types
import type { Row } from "@tanstack/react-table";

interface TitleCellProps {
  row: Row<AllDocsWithChunks>;
}

export default function TitleCell({ row: { getValue, getCanExpand, getToggleExpandedHandler, getIsExpanded } }: TitleCellProps) {
  return (
    <TableCell>
      <Button type="button" variant={getIsExpanded() ? "secondary" : "default"} disabled={!getCanExpand()} onClick={getToggleExpandedHandler()}>
        {getIsExpanded() ? <MinusCircleIcon className="size-9" /> : <PlusCircleIcon className="size-9" />}
        <span className="truncate">{getValue("title")}</span>
      </Button>
    </TableCell>
  );
}

export function TitleCellSkeleton() {
  return (
    <TableCell>
      <Button type="button" variant="default" disabled>
        <PlusCircleIcon className="size-9" />
        <span className="bg-background h-5 w-43 animate-pulse" />
      </Button>
    </TableCell>
  );
}
