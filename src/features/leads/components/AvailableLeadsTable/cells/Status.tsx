// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";
import type { Status } from "@/drizzle/schema/lead";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtom } from "@effect-atom/atom-react";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";
import { RpcLeadsClient } from "@/features/leads/rpc/client";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/custom/select";

// types
import type { Row, Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface StatusCellProps {
  row: Row<AllAvailableLeads>;
  table: Table<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { STATUS } from "@/features/leads/constants";

const setLeadStatusActionAtom = RuntimeAtom.fn(
  Effect.fnUntraced(function* ({
    leadId,
    newStatus,
    table: { options },
    rowIndex,
  }: {
    leadId: string;
    newStatus: Status;
    table: Table<AllAvailableLeads>;
    rowIndex: number;
  }) {
    const { setLeadStatus } = yield* RpcLeadsClient;
    yield* setLeadStatus({ leadId, newStatus });

    // Only reflect changes in the UI if the action was successful
    yield* Effect.sync(() => {
      options.meta?.updateData(rowIndex, "status", newStatus);
      options.meta?.updateData(rowIndex, "updatedAt", new Date());
    });
  }),
);

export default function StatusCell({
  row: {
    index: rowIndex,
    original: { id: leadId },
    getValue,
  },
  table,
  ll,
  llFormToastFeedback,
}: StatusCellProps) {
  // This action establishes a new status for a lead
  const [setLeadStatusResult, setLeadStatusAction] = useAtom(setLeadStatusActionAtom);

  // Provide feedback to the user regarding this server action
  useSubmitToast(
    setLeadStatusActionAtom,
    llFormToastFeedback,
    ll["[SET LEAD STATUS]"],
    ll["The status has been set."],
    ll["The status could not be set; please try again later."],
  );

  return (
    <TableCell className="text-center">
      <Select<Status>
        items={STATUS(ll)}
        value={getValue("status")}
        onValueChange={(newStatus) => {
          // Proceed only if the new status is different from the current one
          if (!newStatus || newStatus === getValue("status")) return;
          setLeadStatusAction({ leadId, newStatus, table, rowIndex });
        }}
        disabled={setLeadStatusResult.waiting}
      >
        <SelectTrigger className="mx-auto w-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-fit">
          <SelectGroup>
            <SelectLabel>
              <p>{ll["Select a status for"]}</p>
              <p className="text-muted-foreground text-lg font-semibold">{getValue("name")}</p>
            </SelectLabel>
            {STATUS(ll).map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </TableCell>
  );
}

export function StatusCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse" />
    </TableCell>
  );
}
