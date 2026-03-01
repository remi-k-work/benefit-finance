// react
import { Suspense } from "react";

// drizzle and db access
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";
import { Auth } from "@/features/auth/lib/auth";

// components
import { InstanceProvider } from "./context";
import BrowseBar from "./BrowseBar";
import TableView, { TableViewSkeleton } from "./TableView";

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const auth = yield* Auth;
  const {
    user: { id: referredBy },
  } = yield* auth.getUserSessionData;

  // Get all leads for a referrer
  const leadDB = yield* LeadDB;
  const allLeadsForReferrer = yield* leadDB.allLeadsForReferrer(referredBy);

  // Create an instance of the lang loader needed for localization
  const { leads: ll } = yield* LangLoader.createEffect();

  return { allLeadsForReferrer, ll };
});

// Component remains the fast, static shell
export default function LeadsForReferrerTable() {
  return (
    <Suspense fallback={<LeadsForReferrerTableSkeleton />}>
      <LeadsForReferrerTableContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function LeadsForReferrerTableContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { allLeadsForReferrer, ll } = await runComponentMain(main);

  return (
    <InstanceProvider allLeadsForReferrer={allLeadsForReferrer} ll={ll}>
      <BrowseBar />
      <TableView />
    </InstanceProvider>
  );
}

export function LeadsForReferrerTableSkeleton() {
  return (
    <>
      <TableViewSkeleton />
    </>
  );
}
