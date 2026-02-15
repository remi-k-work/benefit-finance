// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { useConfirmModal } from "@/atoms/confirmModal";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Button } from "@/components/ui/custom/button";

// assets
import { TrashIcon } from "@heroicons/react/24/outline";

// types
import type { Row } from "@tanstack/react-table";
import type LangLoader from "@/lib/LangLoader";

interface ActionsCellProps {
  row: Row<AllDocsWithChunks>;
  ll: typeof LangLoader.prototype.manSupportAgent;
}

export default function ActionsCell({ row, ll }: ActionsCellProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  return (
    <TableCell>
      <Button
        type="button"
        size="icon"
        variant="destructive"
        title={ll["Delete Document"]}
        onClick={() => {
          openConfirmModal({
            content: (
              <p className="text-center text-xl">
                {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["this document?"]}
              </p>
            ),
            onConfirmed: () => {},
          });
        }}
      >
        <TrashIcon className="size-9" />
      </Button>
    </TableCell>
  );
}

export function ActionsCellSkeleton() {
  return (
    <TableCell>
      <Button type="button" size="icon" variant="destructive" title="Delete Document" disabled>
        <TrashIcon className="size-9" />
      </Button>
    </TableCell>
  );
}
