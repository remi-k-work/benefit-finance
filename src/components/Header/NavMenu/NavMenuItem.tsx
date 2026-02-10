"use client";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { useIsMatchActive } from "./hooks";

// components
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger } from "@/components/ui/custom/navigation-menu";
import NavMenuLink from "./NavMenuLink";

// types
import type { Route } from "next";

interface NavMenuItemProps {
  title: string;
  href?: Route;
  match?: string;
  items?: readonly { title: string; href: Route; match: string }[];
}

export default function NavMenuItem({ title, href, match, items }: NavMenuItemProps) {
  if (items && items.length > 0) return <NavMenuItemExpandable title={title} items={items} />;
  return <NavMenuItemMainLevel title={title} href={href} match={match} />;
}

function NavMenuItemExpandable({ title, items }: Required<Pick<NavMenuItemProps, "title" | "items">>) {
  const isActive = useIsMatchActive(items.map(({ href, match }) => ({ href, match })));

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn("uppercase", isActive && "bg-accent text-accent-foreground")}>{title}</NavigationMenuTrigger>
      <NavigationMenuContent className="uppercase">
        {items.map(({ title, href, match }, index) => (
          <NavMenuLink key={index} title={title} href={href} match={match} />
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function NavMenuItemMainLevel({ title, href, match }: Omit<NavMenuItemProps, "items">) {
  return (
    <NavigationMenuItem>
      <NavMenuLink title={title} href={href} match={match} isMainLevel />
    </NavigationMenuItem>
  );
}
