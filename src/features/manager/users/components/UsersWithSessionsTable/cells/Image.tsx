// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// services, features, and other libraries
import { getInitialsFromName, getUserAvatarUrl } from "@/lib/helpers";

// components
import { TableCell } from "@/components/ui/custom/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/custom/avatar";
import { UserAvatarSkeleton } from "@/components/Avatar/User";

// types
import type { Row } from "@tanstack/react-table";

interface ImageCellProps {
  row: Row<AllUsersWithSessions>;
}

export default function ImageCell({
  row: {
    original: { id, name, image, role },
  },
}: ImageCellProps) {
  return (
    <TableCell className="text-center">
      <Avatar className="size-11">
        {/* If the user is a demo user, use a different avatar image (always random per user) */}
        <AvatarImage src={role === "demo" ? getUserAvatarUrl(id) : (image ?? undefined)} alt={name} />
        <AvatarFallback className="border-none text-2xl">{getInitialsFromName(name)}</AvatarFallback>
      </Avatar>
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
