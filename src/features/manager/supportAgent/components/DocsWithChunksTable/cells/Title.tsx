// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// types
import type { Row } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface TitleCellProps {
  row: Row<AllDocsWithChunks>;
  ll: typeof LangLoader.prototype.manSupportAgent;
}

export default function TitleCell({ row: { getValue, getCanExpand, getToggleExpandedHandler, getIsExpanded }, ll }: TitleCellProps) {
  return (
    <TableCell className="flex items-center gap-2">
      <Button
        type="button"
        size="icon"
        variant={getIsExpanded() ? "secondary" : "default"}
        disabled={!getCanExpand()}
        title={getIsExpanded() ? ll["Collapse Document"] : ll["Expand Document"]}
        onClick={getToggleExpandedHandler()}
      >
        {getIsExpanded() ? <MinusCircleIcon className="size-9" /> : <PlusCircleIcon className="size-9" />}
      </Button>
      {getValue("title")}
    </TableCell>
  );
}

export function TitleCellSkeleton() {
  return (
    <TableCell>
      <Button type="button" size="icon" title="Expand Document" disabled>
        <PlusCircleIcon className="size-9" />
      </Button>
      <span className="bg-background h-5 w-43 animate-pulse" />
    </TableCell>
  );
}
