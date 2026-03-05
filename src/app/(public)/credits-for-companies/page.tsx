// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import HeroB, { HeroBSkeleton } from "@/features/credits/components/HeroB";
import {
  HowDoesCooperation,
  HowDoesCooperationSkeleton,
  PleaseContactUsB,
  PleaseContactUsBSkeleton,
  ProfessionalSupport,
  ProfessionalSupportSkeleton,
  TheScopeOf,
  TheScopeOfSkeleton,
  WhatBusinessLoans,
  WhatBusinessLoansSkeleton,
  WhoIsItFor,
  WhoIsItForSkeleton,
  WhyIsItWorthUsing,
  WhyIsItWorthUsingSkeleton,
} from "@/features/credits/components/Sections";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Credits for Companies",
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
      <PageHeader title={ll["Business loans"]} description={ll["Stable financing for the development of your company"]} />
      <HeroB />
      <article className="mx-auto max-w-300 space-y-9">
        <ProfessionalSupport ll={ll} />
        <WhatBusinessLoans ll={ll} />
        <TheScopeOf ll={ll} />
        <WhyIsItWorthUsing ll={ll} />
        <WhoIsItFor ll={ll} />
        <HowDoesCooperation ll={ll} />
        <PleaseContactUsB ll={ll} />
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <HeroBSkeleton />
      <article className="mx-auto max-w-300 space-y-9">
        <ProfessionalSupportSkeleton />
        <WhatBusinessLoansSkeleton />
        <TheScopeOfSkeleton />
        <WhyIsItWorthUsingSkeleton />
        <WhoIsItForSkeleton />
        <HowDoesCooperationSkeleton />
        <PleaseContactUsBSkeleton />
      </article>
    </>
  );
}
