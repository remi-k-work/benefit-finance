// react
import { Suspense } from "react";

// drizzle and db access
import { SupAgentDocDB } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate, validatePageInputs } from "@/lib/helpersEffect";
import { EditDocPageSchema } from "@/features/manager/supportAgent/schemas/editDocPage";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";
import { ItemNotFoundError, UnauthorizedAccessError } from "@/lib/errors";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import EditDocForm from "@/features/manager/supportAgent/components/EditDocForm";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Manager ► Support Agent ► Edit Document",
};

const main = ({ params, searchParams }: PageProps<"/manager/support-agent/[id]/edit">) =>
  Effect.gen(function* () {
    // Safely validate next.js route inputs (`params` and `searchParams`) against a schema; return typed data or trigger a 404 on failure
    const {
      params: { id: docId },
    } = yield* validatePageInputs(EditDocPageSchema, { params, searchParams });

    // Access the user session data from the server side or fail with an unauthorized access error
    const {
      user: { role },
    } = yield* getUserSessionData;
    if (role !== "admin") return yield* new UnauthorizedAccessError({ message: "Unauthorized access" });

    const supAgentDocDB = yield* SupAgentDocDB;

    // Get a single document
    const doc = yield* supAgentDocDB.getDoc(docId);

    // If the document is not found, fail with item not found error
    if (!doc) return yield* new ItemNotFoundError({ message: "Document not found" });

    // Create an instance of the lang loader needed for localization
    const { manSupportAgentPage: ll, preferredLanguage, manSupportAgent, formToastFeedback } = yield* LangLoader.createEffect();

    return { doc, ll, preferredLanguage, manSupportAgent, formToastFeedback };
  });

// Page remains the fast, static shell
export default function Page({ params, searchParams }: PageProps<"/manager/support-agent/[id]/edit">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function PageContent({ params, searchParams }: PageProps<"/manager/support-agent/[id]/edit">) {
  // Execute the main effect for the page, map known errors to the subsequent navigation helpers, and return the payload
  const { doc, ll, preferredLanguage, manSupportAgent, formToastFeedback } = await runPageMainOrNavigate(main({ params, searchParams }));

  return (
    <>
      <PageHeader
        title={ll["Support Agent ► Edit Document"]}
        description={ll["Use the form below to edit an existing document from the support agent knowledge base"]}
      />
      <EditDocForm doc={doc} preferredLanguage={preferredLanguage} ll={manSupportAgent} llFormToastFeedback={formToastFeedback} />
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
    </>
  );
}
