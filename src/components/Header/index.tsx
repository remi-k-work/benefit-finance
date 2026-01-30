// react
import { Suspense } from "react";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import LangLoader from "@/lib/LangLoader";
import { getUserSessionData } from "@/features/auth/lib/helpers";

// components
import { Logo, LogoSkeleton } from "./Logo";
import NavMenu, { NavMenuSkeleton } from "./NavMenu";
import NavIconItem, { NavIconItemSkeleton } from "./NavIconItem";
import UserPopover, { UserPopoverSkeleton } from "@/components/UserPopover";
import LangChanger, { LangChangerSkeleton } from "@/components/LangChanger";
import { ThemeChanger, ThemeChangerSkeleton } from "@/components/ThemeChanger";

// constants
import { NAV_ICON_ITEMS, NAV_ICON_ITEMS_S } from "./constants";

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
  // Create an instance of the lang loader needed for localization
  const { preferredLanguage, langChanger, navIconItems, themeChanger, userPopover } = await LangLoader.create();

  // Access the user session data from the server side
  const userSessionData = await getUserSessionData();

  return (
    <header
      className={cn(
        "from-background via-secondary z-10 flex flex-wrap items-center gap-1 bg-linear-to-b to-transparent p-2 [grid-area:header] md:gap-4",
        "lg:sticky lg:top-0",
      )}
    >
      <Logo />
      <NavMenu />
      <section className="flex flex-1 items-center justify-around gap-1 md:flex-none md:gap-4">
        {NAV_ICON_ITEMS(navIconItems).map((navIconItem, index) => (
          <Suspense key={index} fallback={<NavIconItemSkeleton {...navIconItem} />}>
            <NavIconItem {...navIconItem} />
          </Suspense>
        ))}
        {userSessionData ? <UserPopover user={userSessionData.user} session={userSessionData.session} ll={userPopover} /> : <UserPopoverSkeleton />}
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
      <section className="flex flex-1 items-center justify-around gap-1 md:flex-none md:gap-4">
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
