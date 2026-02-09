// react
import { Suspense } from "react";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";

// components
import { Logo, LogoSkeleton } from "./Logo";
import NavMenu, { NavMenuSkeleton } from "./NavMenu";
import UserPopover, { UserPopoverSkeleton } from "@/components/UserPopover";
import LangChanger, { LangChangerSkeleton } from "@/components/LangChanger";
import { ThemeChanger, ThemeChangerSkeleton } from "@/components/ThemeChanger";
import SupportAgent, { SupportAgentSkeleton } from "./SupportAgent";

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const { user, session } = yield* getUserSessionData.pipe(Effect.orElse(() => Effect.succeed({ user: null, session: null })));

  // Create an instance of the lang loader needed for localization
  const { preferredLanguage, langChanger, themeChanger, userPopover, supportAgent } = yield* LangLoader.createEffect();

  return { user, session, preferredLanguage, langChanger, themeChanger, userPopover, supportAgent };
});

// Component remains the fast, static shell
export default function Header() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function HeaderContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { user, session, preferredLanguage, langChanger, themeChanger, userPopover, supportAgent } = await runComponentMain(main);

  return (
    <header
      className={cn(
        "from-background via-secondary z-10 flex flex-wrap items-center gap-1 bg-linear-to-b to-transparent p-2 [grid-area:header] md:gap-4",
        "lg:sticky lg:top-0",
      )}
    >
      <Logo />
      <NavMenu />
      <section className="flex flex-1 items-center justify-end gap-3 md:flex-none md:gap-4">
        <SupportAgent ll={supportAgent} />
        <ThemeChanger ll={themeChanger} />
        <LangChanger preferredLanguage={preferredLanguage} ll={langChanger} />
        {user && session ? <UserPopover user={user} session={session} ll={userPopover} /> : <UserPopoverSkeleton />}
      </section>
    </header>
  );
}

export function HeaderSkeleton() {
  return (
    <header
      className={cn(
        "from-background via-secondary z-10 flex flex-wrap items-center gap-1 bg-linear-to-b to-transparent p-2 [grid-area:header] md:gap-4",
        "lg:sticky lg:top-0",
      )}
    >
      <LogoSkeleton />
      <NavMenuSkeleton />
      <section className="flex flex-1 items-center justify-end gap-3 md:flex-none md:gap-4">
        <SupportAgentSkeleton />
        <ThemeChangerSkeleton />
        <LangChangerSkeleton />
        <UserPopoverSkeleton />
      </section>
    </header>
  );
}
