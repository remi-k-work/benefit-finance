// react
import { Suspense } from "react";

// drizzle and db access
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";

// components
import { InstanceProvider } from "./context";
import BrowseBar from "./BrowseBar";
import TableView, { TableViewSkeleton } from "./TableView";

const main = Effect.gen(function* () {
  const leadDB = yield* LeadDB;

  // Get all the available leads
  const allAvailableLeads = yield* leadDB.allAvailableLeads;

  // Create an instance of the lang loader needed for localization
  const { preferredLanguage, leads: ll, formToastFeedback } = yield* LangLoader.createEffect();

  return { allAvailableLeads, preferredLanguage, ll, formToastFeedback };
});

// Component remains the fast, static shell
export default function AvailableLeadsTable() {
  return (
    <Suspense fallback={<AvailableLeadsTableSkeleton />}>
      <AvailableLeadsTableContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function AvailableLeadsTableContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { allAvailableLeads, preferredLanguage, ll, formToastFeedback } = await runComponentMain(main);

  return (
    <InstanceProvider allAvailableLeads={allAvailableLeads} preferredLanguage={preferredLanguage} ll={ll} llFormToastFeedback={formToastFeedback}>
      <BrowseBar />
      <TableView />
    </InstanceProvider>
  );
}

export function AvailableLeadsTableSkeleton() {
  return (
    <>
      <TableViewSkeleton />
    </>
  );
}
