// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate, validatePageInputs } from "@/lib/helpersEffect";
import { ResetPassPageSchema } from "@/features/auth/schemas/resetPassPage";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import ResetPassForm from "@/features/auth/components/ResetPassForm";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Reset Password",
};

const main = ({ params, searchParams }: PageProps<"/reset-password">) =>
  Effect.gen(function* () {
    // Safely validate next.js route inputs (`params` and `searchParams`) against a schema; return typed data or trigger a 404 on failure
    const {
      searchParams: { token },
    } = yield* validatePageInputs(ResetPassPageSchema, { params, searchParams });

    // Create an instance of the lang loader needed for localization
    const { resetPasswordPage: ll, preferredLanguage, resetPassForm, resetPassFormFeedback, formToastFeedback } = yield* LangLoader.createEffect();

    return { token, ll, preferredLanguage, resetPassForm, resetPassFormFeedback, formToastFeedback };
  });

// Page remains the fast, static shell
export default function Page({ params, searchParams }: PageProps<"/reset-password">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function PageContent({ params, searchParams }: PageProps<"/reset-password">) {
  // Execute the main effect for the page, map known errors to the subsequent navigation helpers, and return the payload
  const { token, ll, preferredLanguage, resetPassForm, resetPassFormFeedback, formToastFeedback } = await runPageMainOrNavigate(main({ params, searchParams }));

  return (
    <>
      <PageHeader title={ll["Reset Password"]} description={ll["Use the form below to reset your password"]} />
      <ResetPassForm
        token={token}
        preferredLanguage={preferredLanguage}
        ll={resetPassForm}
        llResetPassFormFeedback={resetPassFormFeedback}
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
