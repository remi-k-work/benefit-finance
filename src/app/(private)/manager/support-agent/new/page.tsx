// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { Auth } from "@/features/auth/lib/auth";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import NewDocForm from "@/features/supportAgent/components/NewDocForm2";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Manager ► Support Agent ► New Document",
};

const main = Effect.gen(function* () {
  // Verify if the current user possesses specific permissions
  const auth = yield* Auth;
  yield* auth.assertPermissions({ supportAgent: ["read"] });

  // Create an instance of the lang loader needed for localization
  const { supportAgent: ll, preferredLanguage, formToastFeedback } = yield* LangLoader.createEffect();

  return { ll, preferredLanguage, formToastFeedback };
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
  const { ll, preferredLanguage, formToastFeedback } = await runPageMainOrNavigate(main);

  return (
    <>
      <PageHeader
        title={ll["Support Agent ► New Document"]}
        description={ll["Use the form below to create a new document that will be added to the support agent knowledge base"]}
      />
      <NewDocForm preferredLanguage={preferredLanguage} ll={ll} llFormToastFeedback={formToastFeedback} />
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
