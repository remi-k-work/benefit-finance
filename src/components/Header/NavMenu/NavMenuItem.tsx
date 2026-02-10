"use client";

// next
import { usePathname } from "next/navigation";
import Link from "next/link";

// services, features, and other libraries
import { cn } from "@/lib/utils";

// components
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/custom/navigation-menu";

// types
import type { Route } from "next";

interface NavMenuItemProps {
  title: string;
  items?: readonly { title: string; href: Route; match: string }[];
  href?: Route;
  match?: string;
}

export default function NavMenuItem({ title, items, href, match }: NavMenuItemProps) {
  const pathname = usePathname();

  if (items && items.length > 0) {
    const isParentActive = items.some((item) => isMatchActive(pathname, item.match, item.href));

    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className={cn("uppercase", isParentActive && "bg-accent text-accent-foreground")}>{title}</NavigationMenuTrigger>
        <NavigationMenuContent className="uppercase">
          {items.map((subItem, index) => (
            <SimpleNavLink key={index} pathname={pathname} {...subItem} />
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <SimpleNavLink title={title} href={href} match={match} isMainLevel pathname={pathname} />
    </NavigationMenuItem>
  );
}

interface SimpleLinkProps {
  title: string;
  href?: Route;
  match?: string;
  isMainLevel?: boolean;
  pathname: string;
}

function SimpleNavLink({ title, href = "#", match, isMainLevel = false, pathname }: SimpleLinkProps) {
  const isActive = isMatchActive(pathname, match, href);

  const LinkComponent = (
    <Link href={href} className={cn(isActive && "bg-accent text-accent-foreground")}>
      {title}
    </Link>
  );

  return <NavigationMenuLink className={cn(isMainLevel && navigationMenuTriggerStyle())} render={LinkComponent} />;
}

function isMatchActive(pathname: string, match?: string, href: string = "#") {
  return new RegExp(match ?? `^${href}$`).test(pathname);
}
