// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Estate Planning",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { estatePlanningPage: ll } = yield* LangLoader.createEffect();

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
    <>
      <PageHeader
        title={ll["Everyone has something valuable to protect"]}
        description={
          ll["We all hope to leave something for the next generation. Decide who gets what, when, and how by creating an estate plan with Benefit Finance"]
        }
      />
    </>
  );
}

function PageSkeleton() {
  return (
    <article className="grid h-full place-items-center">
      <PageHeaderSkeleton />
    </article>
  );
}
