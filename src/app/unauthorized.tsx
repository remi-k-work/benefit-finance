// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import LinkToSignIn from "@/features/auth/components/LinkToSignIn";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Unauthorized",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { unauthorizedPage: ll } = yield* LangLoader.createEffect();

  return { ll };
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
  const { ll } = await runPageMainOrNavigate(main);

  return (
    <article className="grid h-full place-items-center">
      <PageHeader title={ll["Unauthorized"]} description={ll["You are not authorized to view this page"]} />
      <LinkToSignIn signInText={ll["Sign In"]} />
    </article>
  );
}

function PageSkeleton() {
  return (
    <article className="grid h-full place-items-center">
      <PageHeaderSkeleton />
    </article>
  );
}
