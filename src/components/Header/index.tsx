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
import NavIconItem, { NavIconItemSkeleton } from "./NavIconItem";
import UserPopover, { UserPopoverSkeleton } from "@/components/UserPopover";
import LangChanger, { LangChangerSkeleton } from "@/components/LangChanger";
import { ThemeChanger, ThemeChangerSkeleton } from "@/components/ThemeChanger";

// constants
import { NAV_ICON_ITEMS, NAV_ICON_ITEMS_S } from "./constants";

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const { user, session } = yield* getUserSessionData.pipe(Effect.orElse(() => Effect.succeed({ user: null, session: null })));

  // Create an instance of the lang loader needed for localization
  const { preferredLanguage, langChanger, navIconItems, themeChanger, userPopover } = yield* LangLoader.createEffect();

  return { user, session, preferredLanguage, langChanger, navIconItems, themeChanger, userPopover };
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
  const { user, session, preferredLanguage, langChanger, navIconItems, themeChanger, userPopover } = await runComponentMain(main);

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
        {NAV_ICON_ITEMS(navIconItems).map((navIconItem, index) => (
          <Suspense key={index} fallback={<NavIconItemSkeleton {...navIconItem} />}>
            <NavIconItem {...navIconItem} />
          </Suspense>
        ))}
        {user && session ? <UserPopover user={user} session={session} ll={userPopover} /> : <UserPopoverSkeleton />}
        <LangChanger preferredLanguage={preferredLanguage} ll={langChanger} />
        <ThemeChanger ll={themeChanger} />
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
        {NAV_ICON_ITEMS_S.map((navIconItem, index) => (
          <NavIconItemSkeleton key={index} {...navIconItem} />
        ))}
        <UserPopoverSkeleton />
        <LangChangerSkeleton />
        <ThemeChangerSkeleton />
      </section>
    </header>
  );
}
