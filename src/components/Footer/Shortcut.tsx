// react
import { Suspense } from "react";

// next
import Link from "next/link";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { footerShortcut: ll } = yield* LangLoader.createEffect();

  return { ll };
});

// Component remains the fast, static shell
export default function Shortcut() {
  return (
    <Suspense fallback={<ShortcutSkeleton />}>
      <ShortcutContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function ShortcutContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { ll } = await runComponentMain(main);

  return (
    <section className="text-center">
      <h4 className="from-background via-primary to-background mx-auto mb-3 bg-linear-to-r p-1 text-center font-sans text-xl">{ll["Shortcut"]}</h4>
      <ul className="flex flex-col items-center gap-2 md:flex-row md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-3">
        <li>
          <Link href="/" className="link font-mono text-base font-normal normal-case">
            {ll["About Us"]}
          </Link>
        </li>
        <li>
          <Link href="/subsidies" className="link font-mono text-base font-normal normal-case">
            {ll["Subsidies"]}
          </Link>
        </li>
        <li>
          <Link href="/credits-for-individuals" className="link font-mono text-base font-normal normal-case">
            {ll["Credits for Individuals"]}
          </Link>
        </li>
        <li>
          <Link href="/credits-for-companies" className="link font-mono text-base font-normal normal-case">
            {ll["Credits for Companies"]}
          </Link>
        </li>
        <li>
          <Link href="/estate-planning" className="link font-mono text-base font-normal normal-case">
            {ll["Estate Planning"]}
          </Link>
        </li>
        <li>
          <Link href="/couples" className="link font-mono text-base font-normal normal-case">
            {ll["Couples"]}
          </Link>
        </li>
        <li>
          <Link href="/contact-us" className="link font-mono text-base font-normal normal-case">
            {ll["Contact Us"]}
          </Link>
        </li>
      </ul>
    </section>
  );
}

export function ShortcutSkeleton() {
  return (
    <section className="text-center">
      <h4 className="from-background via-primary to-background mx-auto mb-3 animate-pulse bg-linear-to-r p-1 text-center font-sans text-xl">&nbsp;</h4>
      <ul className="flex flex-col items-center gap-2">
        <li>&nbsp;</li>
        <li>&nbsp;</li>
        <li>&nbsp;</li>
        <li>&nbsp;</li>
        <li>&nbsp;</li>
        <li>&nbsp;</li>
        <li>&nbsp;</li>
      </ul>
    </section>
  );
}
