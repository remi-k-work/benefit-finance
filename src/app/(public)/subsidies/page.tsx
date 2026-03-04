// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import Hero, { HeroSkeleton } from "@/features/subsidies/components/Hero";
import {
  EuropeanFunding,
  EuropeanFundingSkeleton,
  GovernmentFunding,
  GovernmentFundingSkeleton,
  PleaseContactUs,
  PleaseContactUsSkeleton,
  ProperlySelected,
  ProperlySelectedSkeleton,
  TheScopeOf,
  TheScopeOfSkeleton,
  WeHelpObtain,
  WeHelpObtainSkeleton,
  WhatDoesCooperation,
  WhatDoesCooperationSkeleton,
  WhoAreTheyFor,
  WhoAreTheyForSkeleton,
  WhyIsItWorth,
  WhyIsItWorthSkeleton,
} from "@/features/subsidies/components/Sections";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Subsidies",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { subsidies: ll } = yield* LangLoader.createEffect();

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
      <PageHeader title={ll["Subsidies"]} description={ll["Development support from EU and government funds"]} />
      <Hero />
      <article className="mx-auto max-w-300 space-y-9">
        <WeHelpObtain ll={ll} />
        <WhyIsItWorth ll={ll} />
        <ProperlySelected ll={ll} />
        <EuropeanFunding ll={ll} />
        <GovernmentFunding ll={ll} />
        <TheScopeOf ll={ll} />
        <WhoAreTheyFor ll={ll} />
        <WhatDoesCooperation ll={ll} />
        <PleaseContactUs ll={ll} />
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <HeroSkeleton />
      <article className="mx-auto max-w-300 space-y-9">
        <WeHelpObtainSkeleton />
        <WhyIsItWorthSkeleton />
        <ProperlySelectedSkeleton />
        <EuropeanFundingSkeleton />
        <GovernmentFundingSkeleton />
        <TheScopeOfSkeleton />
        <WhoAreTheyForSkeleton />
        <WhatDoesCooperationSkeleton />
        <PleaseContactUsSkeleton />
      </article>
    </>
  );
}
