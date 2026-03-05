// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import HeroB, { HeroBSkeleton } from "@/features/insurance/components/HeroB";
import {
  FinancialInsurance,
  FinancialInsuranceSkeleton,
  InsuranceIsOften,
  InsuranceIsOftenSkeleton,
  OurApproach,
  OurApproachSkeleton,
  PleaseContactUs,
  PleaseContactUsSkeleton,
  WhyInsurance,
  WhyInsuranceSkeleton,
} from "@/features/insurance/components/Sections";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Financial Insurance",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { insurance: ll } = yield* LangLoader.createEffect();

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
      <PageHeader title={ll["Insurance"]} description={ll["Consciously securing what is truly important"]} />
      <HeroB />
      <article className="mx-auto max-w-300 space-y-9">
        <WhyInsurance ll={ll} />
        <InsuranceIsOften ll={ll} />
        <FinancialInsurance ll={ll} />
        <OurApproach ll={ll} />
        <PleaseContactUs ll={ll} />
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
        <WhyInsuranceSkeleton />
        <InsuranceIsOftenSkeleton />
        <FinancialInsuranceSkeleton />
        <OurApproachSkeleton />
        <PleaseContactUsSkeleton />
      </article>
    </>
  );
}
