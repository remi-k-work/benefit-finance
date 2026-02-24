// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";
import type { Status } from "@/drizzle/schema/lead";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Badge } from "@/components/ui/custom/badge";

// types
import type { Row } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";
import type { ReactNode } from "react";

interface StatusCellProps {
  row: Row<AllLeadsForReferrer>;
  ll: typeof LangLoader.prototype.leads;
}

// constants
const statuses = (ll: typeof LangLoader.prototype.leads) =>
  [
    {
      value: "during",
      label: (
        <Badge variant="secondary" className="min-w-32 text-base font-semibold">
          {ll["during"]}
        </Badge>
      ),
    },
    {
      value: "accepted",
      label: <Badge className="min-w-32 text-base font-semibold">{ll["accepted"]}</Badge>,
    },
    {
      value: "rejected",
      label: (
        <Badge variant="destructive" className="min-w-32 text-base font-semibold">
          {ll["rejected"]}
        </Badge>
      ),
    },
  ] satisfies { value: Status; label: ReactNode }[];

export default function StatusCell({ row: { getValue }, ll }: StatusCellProps) {
  return <TableCell className="text-center">{statuses(ll).find((status) => status.value === getValue("status"))?.label}</TableCell>;
}

export function StatusCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse" />
    </TableCell>
  );
}
