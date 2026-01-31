/* eslint-disable @next/next/no-html-link-for-pages */

import "./globals.css";

// react
import { Suspense } from "react";

// next
import Image from "next/image";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";

// components
import { ThemeProvider } from "next-themes";
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import { Button } from "@/components/ui/custom/button";

// assets
import { fontSans, fontMono } from "@/assets/fonts";
import logoD from "@/assets/logoOnly.svg";
import { HomeModernIcon } from "@heroicons/react/24/outline";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Not Found",
  description: "Could not find requested resource.",
};

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { notFoundPage: ll } = yield* LangLoader.createEffect();

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
    <html lang="en" translate="no" suppressHydrationWarning>
      <body
        className={cn(
          `${fontSans.variable} ${fontMono.variable} grid font-mono antialiased`,
          "grid-cols-[1fr] grid-rows-[auto_1fr] [grid-template-areas:'header''main']",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header
            className={cn(
              "from-background via-secondary z-10 flex flex-wrap items-center gap-1 bg-linear-to-b to-transparent p-2 [grid-area:header] md:gap-4",
              "lg:sticky lg:top-0",
            )}
          >
            <a href="/" title="Benefit Finance" className="flex-none">
              <Image src={logoD} alt="Benefit Finance" className="size-20 mix-blend-hard-light" />
            </a>
          </header>
          <main className="mx-4 grid h-full place-items-center [grid-area:main]">
            <PageHeader title={ll["Not Found"]} description={ll["Could not find requested resource"]} />
            <Button
              variant="ghost"
              nativeButton={false}
              render={
                <a href="/">
                  <HomeModernIcon className="size-9" />
                  {ll["Return Home"]}
                </a>
              }
            ></Button>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

function PageSkeleton() {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <body
        className={cn(
          `${fontSans.variable} ${fontMono.variable} grid font-mono antialiased`,
          "grid-cols-[1fr] grid-rows-[auto_1fr] [grid-template-areas:'header''main']",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header
            className={cn(
              "from-background via-secondary z-10 flex flex-wrap items-center gap-1 bg-linear-to-b to-transparent p-2 [grid-area:header] md:gap-4",
              "lg:sticky lg:top-0",
            )}
          >
            <a href="/" title="Benefit Finance" className="flex-none">
              <Image src={logoD} alt="Benefit Finance" className="size-20 mix-blend-hard-light" />
            </a>
          </header>
          <main className="mx-4 grid h-full place-items-center [grid-area:main]">
            <PageHeaderSkeleton />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
