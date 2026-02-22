// react
import { startTransition, useState } from "react";

// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// server actions and mutations
import deleteUser from "@/features/manager/users/actions/deleteUser";

// services, features, and other libraries
import { useConfirmModal } from "@/atoms/confirmModal";
import { initialFormState } from "@tanstack/react-form-nextjs";
import useDeleteUserFeedback from "@/features/manager/users/hooks/feedbacks/useDeleteUser";

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
  row: Row<AllUsersWithSessions>;
  table: Table<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.manUsers;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

export default function ActionsCell({
  row: {
    index: rowIndex,
    original: { id: userId },
  },
  table: { options },
  ll,
  llFormToastFeedback,
}: ActionsCellProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // This action permanently deletes a user from the database
  const [deleteUserState, setDeleteUserState] = useState<ActionResultWithFormState>({ ...initialFormState, actionStatus: "idle" });
  const [deleteUserIsPending, setDeleteUserIsPending] = useState(false);

  // Provide feedback to the user regarding this server action
  useDeleteUserFeedback(deleteUserState, ll, llFormToastFeedback);

  return (
    <TableCell className="flex items-center justify-end gap-2">
      <Button
        type="button"
        size="icon"
        variant="destructive"
        title={ll["Delete User"]}
        disabled={deleteUserIsPending}
        onClick={() => {
          openConfirmModal({
            content: (
              <p className="text-center text-xl">
                {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["this user?"]}
              </p>
            ),
            onConfirmed: async () => {
              // Execute the server action first and capture its result
              setDeleteUserIsPending(true);
              const actionResult = await deleteUser(userId);
              setDeleteUserState(actionResult);
              setDeleteUserIsPending(false);

              // Only reflect changes in the UI if the action was successful
              if (actionResult.actionStatus !== "succeeded") return;
              startTransition(() => {
                options.meta?.removeData(rowIndex);
              });
            },
          });
        }}
      >
        {deleteUserIsPending ? <Loader2 className="size-9 animate-spin" /> : <TrashIcon className="size-9" />}
      </Button>
    </TableCell>
  );
}

export function ActionsCellSkeleton() {
  return (
    <TableCell className="flex items-center justify-end gap-2">
      <Button type="button" size="icon" variant="destructive" title="Delete User" disabled>
        <TrashIcon className="size-9" />
      </Button>
    </TableCell>
  );
}
