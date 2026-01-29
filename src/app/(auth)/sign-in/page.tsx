// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate, validatePageInputs } from "@/lib/helpersEffect";
import { SignInPageSchema } from "@/features/auth/schemas/signInPage";

// components
import PageHeader from "@/components/PageHeader";
import SignInForm from "@/features/auth/components/SignInForm";
import SignInDemoUser from "@/features/auth/components/SignInDemoUser";

// types
import type { Metadata, Route } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Sign In",
};

const main = ({ params, searchParams }: PageProps<"/sign-in">) =>
  Effect.gen(function* () {
    // Safely validate next.js route inputs (`params` and `searchParams`) against a schema; return typed data or trigger a 404 on failure
    const {
      searchParams: { redirect },
    } = yield* validatePageInputs(SignInPageSchema, { params, searchParams });

    // Create an instance of the lang loader needed for localization
    const { preferredLanguage, signInForm, signInSocial, signInFormFeedback, formToastFeedback, signInDemoUser, signInDemo } = yield* LangLoader.createEffect();

    return { redirect, preferredLanguage, signInForm, signInSocial, signInFormFeedback, formToastFeedback, signInDemoUser, signInDemo };
  });

// Page remains the fast, static shell
export default function Page({ params, searchParams }: PageProps<"/sign-in">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function PageContent({ params, searchParams }: PageProps<"/sign-in">) {
  // Execute the main effect for the page, map known errors to the subsequent navigation helpers, and return the payload
  const { redirect, preferredLanguage, signInForm, signInSocial, signInFormFeedback, formToastFeedback, signInDemoUser, signInDemo } =
    await runPageMainOrNavigate(main({ params, searchParams }));

  return (
    <>
      <PageHeader title="Sign In" description="Use the form below to sign in" />
      <article className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SignInForm
          redirect={redirect as Route}
          preferredLanguage={preferredLanguage}
          ll={signInForm}
          llSignInSocial={signInSocial}
          llSignInFormFeedback={signInFormFeedback}
          llFormToastFeedback={formToastFeedback}
        />
        <SignInDemoUser redirect={redirect as Route} ll={signInDemoUser} llSignInDemo={signInDemo} />
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeader title="Sign In" description="Use the form below to sign in" />
    </>
  );
}
