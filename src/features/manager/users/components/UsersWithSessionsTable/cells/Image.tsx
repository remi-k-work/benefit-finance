// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// components
import { TableCell } from "@/components/ui/custom/table";

// types
import type { Row } from "@tanstack/react-table";

interface ImageCellProps {
  row: Row<AllUsersWithSessions>;
}

export default function ImageCell({
  row: {
    original: { image },
  },
}: ImageCellProps) {
  return <TableCell className="text-center">{image}</TableCell>;
}

export function ImageCellSkeleton() {
  return (
    <TableCell className="text-center">
      <div className="bg-background mx-auto h-5 w-18 animate-pulse" />
    </TableCell>
  );
}
