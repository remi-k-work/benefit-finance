// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
import type { Row } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface StatusCellProps {
  row: Row<AllLeadsForReferrer>;
  ll: typeof LangLoader.prototype.leads;
}

// constants
import { STATUS } from "@/features/leads/constants";

export default function StatusCell({ row: { getValue }, ll }: StatusCellProps) {
  return <TableCell className="text-center">{STATUS(ll).find(({ value }) => value === getValue("status"))?.label}</TableCell>;
}

export function StatusCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse" />
    </TableCell>
  );
}
