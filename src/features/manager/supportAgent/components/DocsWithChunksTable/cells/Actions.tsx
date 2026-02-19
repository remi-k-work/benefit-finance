// react
import { startTransition, useActionState } from "react";

// next
import Link from "next/link";

// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// server actions and mutations
import deleteDoc from "@/features/manager/supportAgent/actions/deleteDoc";

// services, features, and other libraries
import { useConfirmModal } from "@/atoms/confirmModal";
import { initialFormState } from "@tanstack/react-form-nextjs";
import useDeleteDocFeedback from "@/features/manager/supportAgent/hooks/feedbacks/useDeleteDoc";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { Row } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface ActionsCellProps {
  row: Row<AllDocsWithChunks>;
  ll: typeof LangLoader.prototype.manSupportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

export default function ActionsCell({
  row: {
    original: { id: docId },
  },
  ll,
  llFormToastFeedback,
}: ActionsCellProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // This action deletes the support agent document and all of its associated chunks
  const [deleteDocState, deleteDocAction, deleteDocIsPending] = useActionState(deleteDoc.bind(null, docId), { ...initialFormState, actionStatus: "idle" });

  // Provide feedback to the user regarding this server action
  useDeleteDocFeedback(deleteDocState, ll, llFormToastFeedback);

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
      ></Button>
      <Button
        type="button"
        size="icon"
        variant="destructive"
        title={ll["Delete Document"]}
        disabled={deleteDocIsPending}
        onClick={() => {
          openConfirmModal({
            content: (
              <p className="text-center text-xl">
                {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["this document?"]}
              </p>
            ),
            onConfirmed: () => {
              startTransition(deleteDocAction);
            },
          });
        }}
      >
        {deleteDocIsPending ? <Loader2 className="size-9 animate-spin" /> : <TrashIcon className="size-9" />}
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
