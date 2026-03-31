// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// services, features, and other libraries
import { Effect } from "effect";
import { Atom, useAtom } from "@effect-atom/atom-react";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";
import { RpcLeadsClient } from "@/features/leads/rpc/client";
import { useConfirmModal } from "@/atoms/confirmModal";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { TrashIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { Row, Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface ActionsCellProps {
  row: Row<AllAvailableLeads>;
  table: Table<AllAvailableLeads>;
  ll: typeof LangLoader.prototype.leads;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const deleteLeadActionAtom = Atom.family((leadId: string) =>
  RuntimeAtom.fn(
    Effect.fnUntraced(function* ({ table: { options }, rowIndex }: { table: Table<AllAvailableLeads>; rowIndex: number }) {
      const { deleteLead } = yield* RpcLeadsClient;
      yield* deleteLead({ leadId });

      // Only reflect changes in the UI if the action was successful
      yield* Effect.sync(() => {
        options.meta?.removeData(rowIndex);
      });
    }),
  ),
);

export default function ActionsCell({
  row: {
    index: rowIndex,
    original: { id: leadId },
  },
  table,
  ll,
  llFormToastFeedback,
}: ActionsCellProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // This action permanently deletes a lead from the database
  const [deleteLeadResult, deleteLeadAction] = useAtom(deleteLeadActionAtom(leadId));

  // Provide feedback to the user regarding this server action
  useSubmitToast(
    deleteLeadActionAtom(leadId),
    llFormToastFeedback,
    ll["[DELETE LEAD]"],
    ll["The lead has been deleted."],
    ll["The lead could not be deleted; please try again later."],
  );

  return (
    <TableCell className="flex items-center justify-end gap-2">
      <Button
        type="button"
        size="icon"
        variant="destructive"
        title={ll["Delete Lead"]}
        disabled={deleteLeadResult.waiting}
        onClick={() => {
          openConfirmModal({
            content: (
              <p className="text-center text-xl">
                {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["this lead?"]}
              </p>
            ),
            onConfirmed: () => {
              deleteLeadAction({ table, rowIndex });
            },
          });
        }}
      >
        {deleteLeadResult.waiting ? <Loader2 className="size-9 animate-spin" /> : <TrashIcon className="size-9" />}
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
