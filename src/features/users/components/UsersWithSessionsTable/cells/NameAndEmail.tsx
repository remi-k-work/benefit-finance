// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// types
import type { Row } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface NameAndEmailCellProps {
  row: Row<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.manUsers;
}

export default function NameAndEmailCell({ row: { getValue, getCanExpand, getToggleExpandedHandler, getIsExpanded }, ll }: NameAndEmailCellProps) {
  return (
    <TableCell className="flex items-center gap-2">
      <Button
        type="button"
        size="icon"
        variant={getIsExpanded() ? "secondary" : "default"}
        disabled={!getCanExpand()}
        title={getIsExpanded() ? ll["Collapse User"] : ll["Expand User"]}
        onClick={getToggleExpandedHandler()}
      >
        {getIsExpanded() ? <MinusCircleIcon className="size-9" /> : <PlusCircleIcon className="size-9" />}
      </Button>
      <div className="truncate">
        {getValue("name")}
        <br />
        <a href={`mailto: ${getValue("email")}`} className="link text-base font-normal normal-case">
          {getValue("email")}
        </a>
      </div>
    </TableCell>
  );
}

export function NameAndEmailCellSkeleton() {
  return (
    <TableCell className="flex items-center gap-2">
      <Button type="button" size="icon" title="Expand User" disabled>
        <PlusCircleIcon className="size-9" />
      </Button>
      <div>
        <span className="bg-background h-5 w-43 animate-pulse" />
        <br />
        <span className="bg-background h-5 w-43 animate-pulse" />
      </div>
    </TableCell>
  );
}
