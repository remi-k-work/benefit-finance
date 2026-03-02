// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import Hero from "@/features/aboutUs/components/Hero";
import SectionHeader, { SectionHeaderSkeleton } from "@/components/SectionHeader";

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
      <SectionHeader title={ll["A family-owned company that helps finance and secure dreams"]} />
      <p>{ll["We are a family-owned company that has been supporting clients in financial, credit, insurance, and financing matters for 13 years."]}</p>
      <br />
      <p>{ll["We are not advisors – we act as intermediaries, giving you access to a wide range of banks, insurers and financing programs in one place."]}</p>
      <br />
      <p>{ll["Our goal is for every client to be able to make decisions consciously, calmly and without unnecessary stress."]}</p>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <Hero />
      <SectionHeaderSkeleton />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
      <br />
      <p>&nbsp;</p>
    </>
  );
}
