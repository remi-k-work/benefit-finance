// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import HeroA, { HeroASkeleton } from "@/features/credits/components/HeroA";
import {
  HowDoesWork,
  HowDoesWorkSkeleton,
  PleaseContactUsA,
  PleaseContactUsASkeleton,
  QuickAccess,
  QuickAccessSkeleton,
  WhatLoans,
  WhatLoansSkeleton,
  WhyIsItWorth,
  WhyIsItWorthSkeleton,
} from "@/features/credits/components/Sections";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Credits for Individuals",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { credits: ll } = yield* LangLoader.createEffect();

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
      <PageHeader title={ll["Individual loans"]} description={ll["Support in your financial decisions"]} />
      <HeroA />
      <article className="mx-auto max-w-300 space-y-9">
        <QuickAccess ll={ll} />
        <WhatLoans ll={ll} />
        <WhyIsItWorth ll={ll} />
        <HowDoesWork ll={ll} />
        <PleaseContactUsA ll={ll} />
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <HeroASkeleton />
      <article className="mx-auto max-w-300 space-y-9">
        <QuickAccessSkeleton />
        <WhatLoansSkeleton />
        <WhyIsItWorthSkeleton />
        <HowDoesWorkSkeleton />
        <PleaseContactUsASkeleton />
      </article>
    </>
  );
}
