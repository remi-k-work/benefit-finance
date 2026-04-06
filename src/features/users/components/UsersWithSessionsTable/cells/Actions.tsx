// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// services, features, and other libraries
import { Effect } from "effect";
import { Atom, useAtom } from "@effect-atom/atom-react";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form/hooks";
import { RpcUsersClient } from "@/features/users/rpc/client";
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
  row: Row<AllUsersWithSessions>;
  table: Table<AllUsersWithSessions>;
  ll: typeof LangLoader.prototype.users;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const deleteUserActionAtom = Atom.family((userId: string) =>
  RuntimeAtom.fn(
    Effect.fnUntraced(function* ({ table: { options }, rowIndex }: { table: Table<AllUsersWithSessions>; rowIndex: number }) {
      const { deleteUser } = yield* RpcUsersClient;
      yield* deleteUser({ userId });

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
    original: { id: userId },
  },
  table,
  ll,
  llFormToastFeedback,
}: ActionsCellProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // This action permanently deletes a user from the database
  const [deleteUserResult, deleteUserAction] = useAtom(deleteUserActionAtom(userId));

  // Provide feedback to the user regarding this server action
  useSubmitToast(
    deleteUserActionAtom(userId),
    llFormToastFeedback,
    ll["[DELETE USER]"],
    ll["The user has been deleted."],
    ll["The user could not be deleted; please try again later."],
  );

  return (
    <TableCell className="flex items-center justify-end gap-2">
      <Button
        type="button"
        size="icon"
        variant="destructive"
        title={ll["Delete User"]}
        disabled={deleteUserResult.waiting}
        onClick={() => {
          openConfirmModal({
            content: (
              <p className="text-center text-xl">
                {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["this user?"]}
              </p>
            ),
            onConfirmed: () => {
              deleteUserAction({ table, rowIndex });
            },
          });
        }}
      >
        {deleteUserResult.waiting ? <Loader2 className="size-9 animate-spin" /> : <TrashIcon className="size-9" />}
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
