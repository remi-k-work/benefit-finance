// react
import { Suspense } from "react";

// next
import Link from "next/link";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import { Button } from "@/components/ui/custom/button";

// assets
import { BanknotesIcon } from "@heroicons/react/24/outline";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Email Verified",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { emailVerifiedPage: ll } = yield* LangLoader.createEffect();

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
      <PageHeader title={ll["Email Verified"]} description={ll["Your email has been verified successfully"]} />
      <Button
        variant="ghost"
        nativeButton={false}
        render={
          <Link href="/dashboard">
            <BanknotesIcon className="size-9" />
            {ll["Go to the Dashboard"]}
          </Link>
        }
      ></Button>
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
