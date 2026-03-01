// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { Auth } from "@/features/auth/lib/auth";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import NewLeadForm from "@/features/leads/components/NewLeadForm";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Leads ► New Lead",
};

const main = Effect.gen(function* () {
  // Verify if the current user possesses a specific permission
  const auth = yield* Auth;
  yield* auth.assertPermission({ leads: ["create"] });

  // Create an instance of the lang loader needed for localization
  const { leads: ll, preferredLanguage, formToastFeedback } = yield* LangLoader.createEffect();

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
      <PageHeader title={ll["Leads ► New Lead"]} description={ll["Use the form below to create a new lead"]} />
      <NewLeadForm preferredLanguage={preferredLanguage} ll={ll} llFormToastFeedback={formToastFeedback} />
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
