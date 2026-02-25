// react
import { startTransition, useState } from "react";

// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// server actions and mutations
import deleteLead from "@/features/leads/actions/deleteLead";

// services, features, and other libraries
import { useConfirmModal } from "@/atoms/confirmModal";
import { initialFormState } from "@tanstack/react-form-nextjs";
import useDeleteLeadFeedback from "@/features/leads/hooks/feedbacks/useDeleteLead";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { TrashIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { Row, Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

interface ActionsCellProps {
  row: Row<AllAvailableLeads>;
  table: Table<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

export default function ActionsCell({
  row: {
    index: rowIndex,
    original: { id: leadId },
  },
  table: { options },
  ll,
  llFormToastFeedback,
}: ActionsCellProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // This action permanently deletes a lead from the database
  const [deleteLeadState, setDeleteLeadState] = useState<ActionResultWithFormState>({ ...initialFormState, actionStatus: "idle" });
  const [deleteLeadIsPending, setDeleteLeadIsPending] = useState(false);

  // Provide feedback to the user regarding this server action
  useDeleteLeadFeedback(deleteLeadState, ll, llFormToastFeedback);

  return (
    <TableCell className="flex items-center justify-end gap-2">
      <Button
        type="button"
        size="icon"
        variant="destructive"
        title={ll["Delete Lead"]}
        disabled={deleteLeadIsPending}
        onClick={() => {
          openConfirmModal({
            content: (
              <p className="text-center text-xl">
                {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["this lead?"]}
              </p>
            ),
            onConfirmed: async () => {
              // Execute the server action first and capture its result
              setDeleteLeadIsPending(true);
              const actionResult = await deleteLead(leadId);
              setDeleteLeadState(actionResult);
              setDeleteLeadIsPending(false);

              // Only reflect changes in the UI if the action was successful
              if (actionResult.actionStatus !== "succeeded") return;
              startTransition(() => {
                options.meta?.removeData(rowIndex);
              });
            },
          });
        }}
      >
        {deleteLeadIsPending ? <Loader2 className="size-9 animate-spin" /> : <TrashIcon className="size-9" />}
      </Button>
    </TableCell>
  );
}

export function ActionsCellSkeleton() {
  return (
    <TableCell className="flex items-center justify-end gap-2">
      <Button type="button" size="icon" variant="destructive" title="Delete Lead" disabled>
        <TrashIcon className="size-9" />
      </Button>
    </TableCell>
  );
}
