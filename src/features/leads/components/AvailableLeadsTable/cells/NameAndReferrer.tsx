// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// services, features, and other libraries
import { getInitialsFromName, getUserAvatarUrl } from "@/lib/helpers";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/custom/avatar";
import { UserAvatarSkeleton } from "@/components/Avatar/User";

// assets
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

// types
import type { Row } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface NameAndReferrerCellProps {
  row: Row<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
}

export default function NameAndReferrerCell({
  row: {
    getValue,
    getCanExpand,
    getToggleExpandedHandler,
    getIsExpanded,
    original: {
      referredBy,
      referrer: { image, role },
    },
  },
  ll,
}: NameAndReferrerCellProps) {
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
      <div className="truncate">
        {getValue("name")}
        <div className="flex items-center gap-2">
          <Avatar className="size-11">
            {/* If the user is a demo user, use a different avatar image (always random per user) */}
            <AvatarImage src={role === "demo" ? getUserAvatarUrl(referredBy) : (image ?? undefined)} alt={getValue("referrerName")} />
            <AvatarFallback className="border-none text-2xl">{getInitialsFromName(getValue("referrerName"))}</AvatarFallback>
          </Avatar>
          <div className="text-muted-foreground truncate text-sm">
            {getValue("referrerName")}
            <br />
            <a href={`mailto: ${getValue("referrerEmail")}`} className="link font-normal normal-case">
              {getValue("referrerEmail")}
            </a>
          </div>
        </div>
      </div>
    </TableCell>
  );
}

export function NameAndReferrerCellSkeleton() {
  return (
    <TableCell className="flex items-center gap-2">
      <Button type="button" size="icon" title="Expand Lead" disabled>
        <PlusCircleIcon className="size-9" />
      </Button>
      <div>
        <span className="bg-background h-5 w-43 animate-pulse" />
        <div className="flex items-center gap-2">
          <UserAvatarSkeleton isSmall />
          <div>
            <span className="bg-background h-5 w-43 animate-pulse" />
            <br />
            <span className="bg-background h-5 w-43 animate-pulse" />
          </div>
        </div>
      </div>
    </TableCell>
  );
}
