// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { Auth } from "@/features/auth/lib/auth";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";
import LeadsForReferrerTable, { LeadsForReferrerTableSkeleton } from "@/features/leads/components/LeadsForReferrerTable";
import ProfileInfo from "@/features/dashboard/components/ProfileInfo";
import VerifyEmailForm from "@/features/dashboard/components/VerifyEmailForm";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Dashboard",
};

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const auth = yield* Auth;
  const { user, session } = yield* auth.getUserSessionData;

  // Create an instance of the lang loader needed for localization
  const { dashboardPage: ll, preferredLanguage, profileInfo, verifyEmail, verifyEmailFeedback, formToastFeedback } = yield* LangLoader.createEffect();

  return { user, session, ll, preferredLanguage, profileInfo, verifyEmail, verifyEmailFeedback, formToastFeedback };
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
  const { user, session, ll, preferredLanguage, profileInfo, verifyEmail, verifyEmailFeedback, formToastFeedback } = await runPageMainOrNavigate(main);

  return (
    <>
      <PageHeader title={ll["Dashboard"]} description={ll["Welcome back! Below is your account overview"]} />
      <SectionHeader title={ll["Leads that you have submitted so far"]} />
      <LeadsForReferrerTable />
      <SectionHeader title={ll["Your basic profile information"]} />
      <article className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProfileInfo user={user} session={session} ll={profileInfo} />
        <VerifyEmailForm
          user={user}
          preferredLanguage={preferredLanguage}
          ll={verifyEmail}
          llVerifyEmailFeedback={verifyEmailFeedback}
          llFormToastFeedback={formToastFeedback}
        />
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <SectionHeaderSkeleton />
      <LeadsForReferrerTableSkeleton />
      <SectionHeaderSkeleton />
    </>
  );
}
