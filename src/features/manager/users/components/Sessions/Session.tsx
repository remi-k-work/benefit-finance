// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// services, features, and other libraries
import { useInstanceContext } from "@/features/manager/users/components/UsersWithSessionsTable/context";

// components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import DateTimeAt from "@/components/DateTimeAt";

// assets
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

// types
interface SessionProps {
  session: AllUsersWithSessions["sessions"][number];
}

export default function Session({ session: { browser, os, device, createdAt, updatedAt, expiresAt } }: SessionProps) {
  // Access the table context and retrieve all necessary information
  const { ll } = useInstanceContext();

  return (
    <Card className="shrink-0 grow-0 basis-[65ch]">
      <CardHeader className="from-card via-secondary to-card bg-linear-to-r p-3">
        <CardTitle>{browser ?? ll["Unknown Browser"]}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="uppercase">{ll["Operating System"]}</p>
        <p className="text-muted-foreground">{os ?? ll["Unknown Operating System"]}</p>
        <br />
        <p className="uppercase">{ll["Device"]}</p>
        <p className="text-muted-foreground">{device ?? ll["Unknown Device"]}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-around gap-6 border-t pt-6">
        <DateTimeAt icon={<CalendarIcon className="size-9" />} title={ll["Created At"]} date={createdAt} />
        <DateTimeAt icon={<CalendarIcon className="size-9" />} title={ll["Updated At"]} date={updatedAt} />
        <DateTimeAt icon={<ClockIcon className="size-9" />} title={ll["Expires At"]} date={expiresAt} />
      </CardFooter>
    </Card>
  );
}
