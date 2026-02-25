// react
import { startTransition, useState } from "react";

// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";
import type { Status } from "@/drizzle/schema/lead";

// server actions and mutations
import setLeadStatus from "@/features/leads/actions/setLeadStatus";

// services, features, and other libraries
import { initialFormState } from "@tanstack/react-form-nextjs";
import useSetLeadStatusFeedback from "@/features/leads/hooks/feedbacks/useSetLeadStatus";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/custom/select";

// types
import type { Row, Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

interface StatusCellProps {
  row: Row<AllAvailableLeads>;
  table: Table<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { STATUS } from "@/features/leads/constants";

export default function StatusCell({
  row: {
    index: rowIndex,
    original: { id: leadId },
    getValue,
  },
  table: { options },
  ll,
  llFormToastFeedback,
}: StatusCellProps) {
  // This action establishes a new status for a lead
  const [setLeadStatusState, setSetLeadStatusState] = useState<ActionResultWithFormState>({ ...initialFormState, actionStatus: "idle" });
  const [setLeadStatusIsPending, setSetLeadStatusIsPending] = useState(false);

  // Provide feedback to the user regarding this server action
  useSetLeadStatusFeedback(setLeadStatusState, ll, llFormToastFeedback);

  return (
    <TableCell className="text-center">
      <Select<Status>
        items={STATUS(ll)}
        value={getValue("status")}
        onValueChange={async (newStatus) => {
          // Proceed only if the new status is different from the current one
          if (!newStatus || newStatus === getValue("status")) return;

          // Execute the server action first and capture its result
          setSetLeadStatusIsPending(true);
          const actionResult = await setLeadStatus(leadId, newStatus);
          setSetLeadStatusState(actionResult);
          setSetLeadStatusIsPending(false);

          // Only reflect changes in the UI if the action was successful
          if (actionResult.actionStatus !== "succeeded") return;
          startTransition(() => {
            options.meta?.updateData(rowIndex, "status", newStatus);
            options.meta?.updateData(rowIndex, "updatedAt", new Date());
          });
        }}
        disabled={setLeadStatusIsPending}
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
