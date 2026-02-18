// react
import { Suspense } from "react";

// drizzle and db access
import { UsersDB } from "@/features/manager/users/db";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";

// components
import { InstanceProvider } from "./context";
import BrowseBar from "./BrowseBar";
import TableView, { TableViewSkeleton } from "./TableView";

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const { session } = yield* getUserSessionData;

  const usersDB = yield* UsersDB;

  // Get all users with their corresponding sessions and accounts (used by the tanstack table)
  const allUsersWithSessions = yield* usersDB.allUsersWithSessions;

  // Create an instance of the lang loader needed for localization
  const { manUsers: ll, formToastFeedback } = yield* LangLoader.createEffect();

  return { session, allUsersWithSessions, ll, formToastFeedback };
});

// Component remains the fast, static shell
export default function UsersWithSessionsTable() {
  return (
    <Suspense fallback={<UsersWithSessionsTableSkeleton />}>
      <UsersWithSessionsTableContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function UsersWithSessionsTableContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { session, allUsersWithSessions, ll, formToastFeedback } = await runComponentMain(main);

  return (
    <InstanceProvider session={session} allUsersWithSessions={allUsersWithSessions} ll={ll} llFormToastFeedback={formToastFeedback}>
      <BrowseBar />
      <TableView />
    </InstanceProvider>
  );
}

export function UsersWithSessionsTableSkeleton() {
  return (
    <>
      <TableViewSkeleton />
    </>
  );
}
