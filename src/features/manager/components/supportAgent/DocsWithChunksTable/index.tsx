// react
import { Suspense } from "react";

// drizzle and db access
import { SupAgentDocDB } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect } from "effect";
import { runComponentMain } from "@/lib/helpersEffect";

// components
import { InstanceProvider } from "./context";
import BrowseBar from "./BrowseBar";
import TableView, { TableViewSkeleton } from "./TableView";

const main = Effect.gen(function* () {
  const supAgentDocDB = yield* SupAgentDocDB;

  // Get all documents with their corresponding chunks (used by the tanstack table)
  const allDocsWithChunks = yield* supAgentDocDB.allDocsWithChunks;

  return { allDocsWithChunks };
});

// Component remains the fast, static shell
export default function DocsWithChunksTable() {
  return (
    <Suspense fallback={<DocsWithChunksTableSkeleton />}>
      <DocsWithChunksTableContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function DocsWithChunksTableContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { allDocsWithChunks } = await runComponentMain(main);

  return (
    <InstanceProvider allDocsWithChunks={allDocsWithChunks}>
      <BrowseBar />
      <TableView />
    </InstanceProvider>
  );
}

export function DocsWithChunksTableSkeleton() {
  return (
    <>
      <TableViewSkeleton />
    </>
  );
}
