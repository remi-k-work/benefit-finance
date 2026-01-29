// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import ForgotPassForm from "@/features/auth/components/ForgotPassForm";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Forgot Password",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { forgotPasswordPage: ll, preferredLanguage, forgotPassForm, forgotPassFormFeedback, formToastFeedback } = yield* LangLoader.createEffect();

  return { ll, preferredLanguage, forgotPassForm, forgotPassFormFeedback, formToastFeedback };
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
  const { ll, preferredLanguage, forgotPassForm, forgotPassFormFeedback, formToastFeedback } = await runPageMainOrNavigate(main);

  return (
    <>
      <PageHeader title={ll["Forgot Password"]} description={ll["Use the form below to reset your password"]} />
      <ForgotPassForm
        preferredLanguage={preferredLanguage}
        ll={forgotPassForm}
        llForgotPassFormFeedback={forgotPassFormFeedback}
        llFormToastFeedback={formToastFeedback}
      />
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
