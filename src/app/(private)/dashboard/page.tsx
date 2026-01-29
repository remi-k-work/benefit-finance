// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import ProfileInfo from "@/features/dashboard/components/ProfileInfo";
import VerifyEmail from "@/features/dashboard/components/VerifyEmail";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Dashboard",
};

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const { user, session } = yield* getUserSessionData;

  // Create an instance of the lang loader needed for localization
  const { dashboardPage: ll, profileInfo, verifyEmail, verifyEmailFeedback, formToastFeedback } = yield* LangLoader.createEffect();

  return { user, session, ll, profileInfo, verifyEmail, verifyEmailFeedback, formToastFeedback };
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
  const { user, session, ll, profileInfo, verifyEmail, verifyEmailFeedback, formToastFeedback } = await runPageMainOrNavigate(main);

  return (
    <>
      <PageHeader title={ll["Dashboard"]} description={ll["Welcome back! Below is your account overview"]} />
      <article className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProfileInfo user={user} session={session} ll={profileInfo} />
        <VerifyEmail user={user} ll={verifyEmail} llVerifyEmailFeedback={verifyEmailFeedback} llFormToastFeedback={formToastFeedback} />
      </article>
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
