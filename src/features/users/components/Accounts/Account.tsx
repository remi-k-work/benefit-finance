// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// services, features, and other libraries
import { useInstanceContext } from "@/features/users/components/UsersWithSessionsTable/context";

// components
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import DateTimeAt from "@/components/DateTimeAt";

// assets
import { CalendarIcon } from "@heroicons/react/24/outline";

// types
interface AccountProps {
  account: AllUsersWithSessions["accounts"][number];
}

export default function Account({ account: { providerId, createdAt, updatedAt } }: AccountProps) {
  // Access the table context and retrieve all necessary information
  const { ll } = useInstanceContext();

  return (
    <Card className="shrink-0 grow-0 basis-[65ch]">
      <CardHeader className="from-card via-secondary to-card bg-linear-to-r p-3">
        <CardTitle>{providerId}</CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-wrap items-center justify-around gap-6 border-t pt-6">
        <DateTimeAt icon={<CalendarIcon className="size-9" />} title={ll["Created At"]} date={createdAt} />
        <DateTimeAt icon={<CalendarIcon className="size-9" />} title={ll["Updated At"]} date={updatedAt} />
      </CardFooter>
    </Card>
  );
}
