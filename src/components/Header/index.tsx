// react
import { Suspense } from "react";

// next
import Link from "next/link";

// services, features, and other libraries
import { cn } from "@/lib/utils";

// components
import { Logo, LogoSkeleton } from "./Logo";
import NavItem, { NavItemSkeleton } from "./NavItem";
import { ThemeChanger, ThemeChangerSkeleton } from "@/components/ThemeChanger";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/custom/navigation-menu";

// types
import type { Route } from "next";

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
      <NavigationMenu className="mx-auto uppercase">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="uppercase">Products</NavigationMenuTrigger>
            <NavigationMenuContent className="uppercase">
              <NavigationMenuLink render={<Link href="#">Spending</Link>} />
              <NavigationMenuLink render={<Link href="#">Investing</Link>} />
              <NavigationMenuLink render={<Link href="#">Forecasting</Link>} />
              <NavigationMenuLink render={<Link href="#">Estate Planning</Link>} />
              <NavigationMenuLink render={<Link href="#">Couples</Link>} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/">For Employers</Link>} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/">Resources</Link>} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <section className="flex flex-none items-center gap-4">
        {NAV_ITEMS.map((navItem, index) => (
          <Suspense key={index} fallback={<NavItemSkeleton {...navItem} />}>
            <NavItem {...navItem} />
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
      <nav className="flex flex-1 flex-wrap items-center justify-end gap-4">
        {NAV_ITEMS.map((navItem, index) => (
          <NavItemSkeleton key={index} {...navItem} />
        ))}
        <ThemeChangerSkeleton />
      </nav>
    </header>
  );
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: Route }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="text-muted-foreground line-clamp-2">{children}</div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
