// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// types
import type { Row } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface NameCellProps {
  row: Row<AllLeadsForReferrer>;
  ll: typeof LangLoader.prototype.leads;
}

export default function NameCell({ row: { getValue, getCanExpand, getToggleExpandedHandler, getIsExpanded }, ll }: NameCellProps) {
  return (
    <TableCell className="flex items-center gap-2">
      <Button
        type="button"
        size="icon"
        variant={getIsExpanded() ? "secondary" : "default"}
        disabled={!getCanExpand()}
        title={getIsExpanded() ? ll["Collapse Lead"] : ll["Expand Lead"]}
        onClick={getToggleExpandedHandler()}
      >
        {getIsExpanded() ? <MinusCircleIcon className="size-9" /> : <PlusCircleIcon className="size-9" />}
      </Button>
      <div className="truncate">{getValue("name")}</div>
    </TableCell>
  );
}

export function NameCellSkeleton() {
  return (
    <TableCell className="flex items-center gap-2">
      <Button type="button" size="icon" title="Expand Lead" disabled>
        <PlusCircleIcon className="size-9" />
      </Button>
      <div>
        <span className="bg-background h-5 w-43 animate-pulse" />
      </div>
    </TableCell>
  );
}
