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
      <article className="mx-auto max-w-300">
        <SectionHeader title={ll["A family-owned company that helps finance and secure dreams"]} />
        <p>{ll["We are a family-owned company that has been supporting clients in financial, credit, insurance, and financing matters for 13 years."]}</p>
        <br />
        <p>{ll["We are not advisors – we act as intermediaries, giving you access to a wide range of banks, insurers and financing programs in one place."]}</p>
        <br />
        <p>{ll["Our goal is for every client to be able to make decisions consciously, calmly and without unnecessary stress."]}</p>
        <SectionHeader title={ll["Who we are"]} />
        <p>{ll["As a family business, we combine experience, peace of mind and an individual approach."]}</p>
        <br />
        <p>
          {
            ll[
              "We support both individual clients and businesses by offering a full overview of available solutions, without the need to search for the best offers yourself."
            ]
          }
        </p>
        <SectionHeader title={ll["How we work"]} />
        <p>{ll["We help you find the best credit, insurance, and financing solutions."]}</p>
        <br />
        <p>{ll["We conduct the process in a transparent and orderly manner."]}</p>
        <br />
        <p>{ll["We act as an intermediary, not an advisor, offering full access to offers."]}</p>
        <br />
        <p>{ll["We support the client at every stage, without exerting pressure."]}</p>
        <br />
        <p>{ll["Our priority is customer comfort and decision security, not the sale of specific products."]}</p>
        <SectionHeader title={ll["Our values"]} />
        <p>{ll["Trust – family relationships translate into relationships with clients."]}</p>
        <br />
        <p>{ll["Responsibility – we show real possibilities, we do not promise miracles."]}</p>
        <br />
        <p>{ll["Transparency – we inform you about all terms of cooperation."]}</p>
        <br />
        <p>{ll["Peace of mind and individual approach – each client is treated uniquely."]}</p>
        <SectionHeader title={ll["Why customers trust us"]} />
        <p>{ll["We act reliably and calmly."]}</p>
        <br />
        <p>{ll["We offer access to a wide range of offers in one place."]}</p>
        <br />
        <p>{ll["Brokerage services are free of charge to the client."]}</p>
        <br />
        <p>{ll["We provide support and information at every stage of cooperation."]}</p>
        <br />
        <p>{ll["We care about long-term relationships, not just the transaction."]}</p>
        <br />
        <p>{ll["We work with experienced specialists from various industries, allowing us to provide comprehensive support in every situation."]}</p>
        <SectionHeader title={ll["Scope of operation"]} />
        <p>{ll["Individual and corporate loans – Podkarpackie Voivodeship and neighboring regions."]}</p>
        <br />
        <p>{ll["Insurance – nationwide service."]}</p>
        <br />
        <p>{ll["Funding – EU funds and government programs."]}</p>
        <br />
        <p>{ll["This allows us to comprehensively support clients at various stages of life and business."]}</p>
        <SectionHeader title={ll["Please contact us"]} />
        <p>
          {
            ll[
              "If you are looking for a reliable, family-run team of intermediaries who will facilitate your access to the best loan, insurance, and financing offers, please contact us."
            ]
          }
        </p>
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <Hero />
      <article className="mx-auto max-w-300">
        <SectionHeaderSkeleton />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <SectionHeaderSkeleton />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <SectionHeaderSkeleton />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <SectionHeaderSkeleton />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <SectionHeaderSkeleton />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <SectionHeaderSkeleton />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <br />
        <p>&nbsp;</p>
        <SectionHeaderSkeleton />
        <p>&nbsp;</p>
      </article>
    </>
  );
}
