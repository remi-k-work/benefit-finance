// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import Hero from "@/features/contactUs/components/Hero";
import ContactUsMap from "@/features/contactUs/components/ContactUsMap";
import ContactUsForm from "@/features/contactUs/components/ContactUsForm";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Contact Us",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { contactUsPage: ll, preferredLanguage, contactUsForm, contactUsFormFeedback, formToastFeedback } = yield* LangLoader.createEffect();

  return { ll, preferredLanguage, contactUsForm, contactUsFormFeedback, formToastFeedback };
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
  const { ll, preferredLanguage, contactUsForm, contactUsFormFeedback, formToastFeedback } = await runPageMainOrNavigate(main);

  return (
    <>
      <PageHeader title={ll["Reach out anytime"]} description={ll["Have a question? Need help? Just want to talk money? We are listening"]} />
      <Hero />
      <article className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ContactUsMap />
        <ContactUsForm
          preferredLanguage={preferredLanguage}
          ll={contactUsForm}
          llContactUsFormFeedback={contactUsFormFeedback}
          llFormToastFeedback={formToastFeedback}
        />
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <Hero />
    </>
  );
}
