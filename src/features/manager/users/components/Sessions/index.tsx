// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// services, features, and other libraries
import { useInstanceContext } from "@/features/manager/users/components/UsersWithSessionsTable/context";

// components
import Session from "./Session";

// types
interface SessionsProps {
  userWithSessions: AllUsersWithSessions;
}

export default function Sessions({ userWithSessions: { sessions } }: SessionsProps) {
  // Access the table context and retrieve all necessary information
  const { ll } = useInstanceContext();

  return (
    <>
      <h2 className="from-background via-primary to-secondary max-w-none bg-linear-to-r p-3 uppercase">
        {ll["Sessions"]}
        &nbsp;({sessions.length})
      </h2>
      <article className="flex gap-6 overflow-x-auto">
        {sessions.map((session) => (
          <Session key={session.id} session={session} />
        ))}
      </article>
    </>
  );
}
