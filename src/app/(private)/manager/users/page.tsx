// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";
import { UnauthorizedAccessError } from "@/lib/errors";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import UsersWithSessionsTable, { UsersWithSessionsTableSkeleton } from "@/features/users/components/UsersWithSessionsTable";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Manager ► Users",
};

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const {
    user: { role },
  } = yield* getUserSessionData;
  if (role !== "admin") return yield* new UnauthorizedAccessError({ message: "Unauthorized access" });

  // Create an instance of the lang loader needed for localization
  const { manUsersPage: ll } = yield* LangLoader.createEffect();

  return { ll };
});

// Page remains the fast, static shell
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function PageContent() {
  // Execute the main effect for the page, map known errors to the subsequent navigation helpers, and return the payload
  const { ll } = await runPageMainOrNavigate(main);

  return (
    <>
      <PageHeader title={ll["Users"]} description={ll["Below, you can view and manage all the users"]} />
      <UsersWithSessionsTable />
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <UsersWithSessionsTableSkeleton />
    </>
  );
}
