// drizzle and db access
import type { AllUsersWithSessions } from "@/features/users/db";

// services, features, and other libraries
import { useInstanceContext } from "@/features/users/components/UsersWithSessionsTable/context";

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
      <h2 className="from-background via-card to-background max-w-none bg-linear-to-b from-15% to-85% p-3 uppercase">
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
