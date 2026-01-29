// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import SignUpForm from "@/features/auth/components/SignUpForm";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Sign Up",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { signUpPage: ll, preferredLanguage, signUpForm, signUpFormFeedback, formToastFeedback } = yield* LangLoader.createEffect();

  return { ll, preferredLanguage, signUpForm, signUpFormFeedback, formToastFeedback };
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
  const { ll, preferredLanguage, signUpForm, signUpFormFeedback, formToastFeedback } = await runPageMainOrNavigate(main);

  return (
    <>
      <PageHeader title={ll["Sign Up"]} description={ll["Use the form below to sign up"]} />
      <SignUpForm preferredLanguage={preferredLanguage} ll={signUpForm} llSignUpFormFeedback={signUpFormFeedback} llFormToastFeedback={formToastFeedback} />
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
