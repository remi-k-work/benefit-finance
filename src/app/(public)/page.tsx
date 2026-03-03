// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import Hero, { HeroSkeleton } from "@/features/aboutUs/components/Hero";
import {
  FamilyOwned,
  FamilyOwnedSkeleton,
  HowWeWork,
  HowWeWorkSkeleton,
  OurValues,
  OurValuesSkeleton,
  PleaseContactUs,
  PleaseContactUsSkeleton,
  ScopeOfOperation,
  ScopeOfOperationSkeleton,
  WhoWeAre,
  WhoWeAreSkeleton,
  WhyCustomers,
  WhyCustomersSkeleton,
} from "@/features/aboutUs/components/Sections";

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { aboutUs: ll } = yield* LangLoader.createEffect();

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
      <PageHeader title={ll["About Us"]} description={ll["Welcome to Benefit Finance!"]} />
      <Hero />
      <article className="mx-auto max-w-300 space-y-9">
        <FamilyOwned ll={ll} />
        <WhoWeAre ll={ll} />
        <HowWeWork ll={ll} />
        <OurValues ll={ll} />
        <WhyCustomers ll={ll} />
        <ScopeOfOperation ll={ll} />
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
        <FamilyOwnedSkeleton />
        <WhoWeAreSkeleton />
        <HowWeWorkSkeleton />
        <OurValuesSkeleton />
        <WhyCustomersSkeleton />
        <ScopeOfOperationSkeleton />
        <PleaseContactUsSkeleton />
      </article>
    </>
  );
}
