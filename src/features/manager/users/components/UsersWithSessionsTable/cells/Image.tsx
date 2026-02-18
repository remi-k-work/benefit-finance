// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// components
import { TableCell } from "@/components/ui/custom/table";
import { UserAvatar, UserAvatarSkeleton } from "@/components/Avatar/User";

// types
import type { Row } from "@tanstack/react-table";
import type { Session } from "@/services/better-auth/auth";

interface ImageCellProps {
  row: Row<AllUsersWithSessions>;
  session: Session;
}

export default function ImageCell({ row: { original: user }, session }: ImageCellProps) {
  return (
    <TableCell className="text-center">
      <UserAvatar user={user} session={session} isSmall />
    </TableCell>
  );
}

export function ImageCellSkeleton() {
  return (
    <TableCell className="text-center">
      <UserAvatarSkeleton isSmall />
    </TableCell>
  );
}
