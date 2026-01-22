// react
import { Suspense } from "react";

// services, features, and other libraries
import { cn } from "@/lib/utils";

// components
import { Logo, LogoSkeleton } from "./Logo";
import NavMenu from "./NavMenu";
import NavIconItem, { NavIconItemSkeleton } from "./NavIconItem";
import { ThemeChanger, ThemeChangerSkeleton } from "@/components/ThemeChanger";

// constants
import { NAV_ICON_ITEMS } from "./constants";

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
  return (
    <header
      className={cn("from-background via-secondary z-10 flex items-center gap-4 bg-linear-to-b to-transparent p-2 [grid-area:header]", "lg:sticky lg:top-0")}
    >
      <Logo />
      <NavMenu />
      <section className="flex flex-none items-center gap-4">
        {NAV_ICON_ITEMS.map((navIconItem, index) => (
          <Suspense key={index} fallback={<NavIconItemSkeleton {...navIconItem} />}>
            <NavIconItem {...navIconItem} />
          </Suspense>
        ))}
        <ThemeChanger />
      </section>
    </header>
  );
}

function HeaderSkeleton() {
  return (
    <header
      className={cn("from-background via-secondary z-10 flex items-center gap-4 bg-linear-to-b to-transparent p-2 [grid-area:header]", "lg:sticky lg:top-0")}
    >
      <LogoSkeleton />
      <section className="flex flex-none items-center gap-4">
        {NAV_ICON_ITEMS.map((navIconItem, index) => (
          <NavIconItemSkeleton key={index} {...navIconItem} />
        ))}
        <ThemeChangerSkeleton />
      </section>
    </header>
  );
}
