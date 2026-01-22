// react
import { Suspense } from "react";

// services, features, and other libraries
import { cn } from "@/lib/utils";

// components
import { Logo, LogoSkeleton } from "./Logo";
import NavItem, { NavItemSkeleton } from "./NavItem";
import { ThemeChanger, ThemeChangerSkeleton } from "@/components/ThemeChanger";

// constants
import { NAV_ITEMS } from "./constants";

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
      <nav className="flex flex-1 flex-wrap items-center justify-end gap-4">
        {NAV_ITEMS.map((navItem, index) => (
          <Suspense key={index} fallback={<NavItemSkeleton {...navItem} />}>
            <NavItem {...navItem} />
          </Suspense>
        ))}
        <ThemeChanger />
      </nav>
    </header>
  );
}

function HeaderSkeleton() {
  return (
    <header
      className={cn("from-background via-secondary z-10 flex items-center gap-4 bg-linear-to-b to-transparent p-2 [grid-area:header]", "lg:sticky lg:top-0")}
    >
      <LogoSkeleton />
      <nav className="flex flex-1 flex-wrap items-center justify-end gap-4">
        {NAV_ITEMS.map((navItem, index) => (
          <NavItemSkeleton key={index} {...navItem} />
        ))}
        <ThemeChangerSkeleton />
      </nav>
    </header>
  );
}
