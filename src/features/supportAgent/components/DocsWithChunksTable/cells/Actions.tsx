// next
import Link from "next/link";

// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect } from "effect";
import { Atom, useAtom } from "@effect-atom/atom-react";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form/hooks";
import { RpcSupportAgentClient } from "@/features/supportAgent/rpc/client";
import { useConfirmModal } from "@/atoms/confirmModal";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { Row, Table } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface ActionsCellProps {
  row: Row<AllDocsWithChunks>;
  table: Table<AllDocsWithChunks>;
  ll: typeof LangLoader.prototype.supportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const deleteDocActionAtom = Atom.family((docId: string) =>
  RuntimeAtom.fn(
    Effect.fnUntraced(function* ({ table: { options }, rowIndex }: { table: Table<AllDocsWithChunks>; rowIndex: number }) {
      const { deleteDoc } = yield* RpcSupportAgentClient;
      yield* deleteDoc({ docId });

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
    original: { id: docId },
  },
  table,
  ll,
  llFormToastFeedback,
}: ActionsCellProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // This action deletes the support agent document and all of its associated chunks
  const [deleteDocResult, deleteDocAction] = useAtom(deleteDocActionAtom(docId));

  // Provide feedback to the user regarding this server action
  useSubmitToast(
    deleteDocActionAtom(docId),
    llFormToastFeedback,
    ll["[DELETE DOCUMENT]"],
    ll["The document has been deleted."],
    ll["The document could not be deleted; please try again later."],
  );

  return (
    <TableCell className="flex items-center justify-end gap-2">
      <Button
        size="icon"
        nativeButton={false}
        title={ll["Edit Document"]}
        render={
          <Link href={`/manager/support-agent/${docId}/edit`}>
            <PencilSquareIcon className="size-9" />
          </Link>
        }
      />
      <Button
        type="button"
        size="icon"
        variant="destructive"
        title={ll["Delete Document"]}
        disabled={deleteDocResult.waiting}
        onClick={() => {
          openConfirmModal({
            content: (
              <p className="text-center text-xl">
                {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["this document?"]}
              </p>
            ),
            onConfirmed: () => {
              deleteDocAction({ table, rowIndex });
            },
          });
        }}
      >
        {deleteDocResult.waiting ? <Loader2 className="size-9 animate-spin" /> : <TrashIcon className="size-9" />}
      </Button>
    </TableCell>
  );
}

export function ActionsCellSkeleton() {
  return (
    <TableCell className="flex items-center justify-end gap-2">
      <Button type="button" size="icon" title="Edit Document" disabled>
        <PencilSquareIcon className="size-9" />
      </Button>
      <Button type="button" size="icon" variant="destructive" title="Delete Document" disabled>
        <TrashIcon className="size-9" />
      </Button>
    </TableCell>
  );
}
