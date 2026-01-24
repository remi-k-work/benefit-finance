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

  // SCENARIO 1: It's a Dropdown (has children)
  if (items && items.length > 0) {
    // Check if any child is active to highlight the parent trigger
    const isParentActive = items.some(({ match }) => {
      // If match regex is provided, use it; otherwise, use exact href match
      const regex = new RegExp(match);
      return regex.test(pathname);
    });

    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className={cn("uppercase", isParentActive && "bg-accent text-accent-foreground")}>{title}</NavigationMenuTrigger>
        <NavigationMenuContent className="uppercase">
          {items.map((subItem, index) => (
            <SimpleNavLink key={index} {...subItem} />
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // SCENARIO 2: It's a Direct Link (no children)
  return (
    <NavigationMenuItem>
      <SimpleNavLink title={title} href={href} match={match} isMainLevel />
    </NavigationMenuItem>
  );
}

interface SimpleLinkProps {
  title: string;
  href?: Route;
  match?: string;
  isMainLevel?: boolean;
}

function SimpleNavLink({ title, href = "#", match, isMainLevel = false }: SimpleLinkProps) {
  const pathname = usePathname();

  // Logic: Use regex if provided, otherwise simple exact match
  const regexString = match || `^${href}$`;
  const isActive = new RegExp(regexString).test(pathname);

  const LinkComponent = (
    <Link href={href} className={cn(isActive && "bg-accent text-accent-foreground")}>
      {title}
    </Link>
  );

  return <NavigationMenuLink className={cn(isMainLevel && navigationMenuTriggerStyle())} render={LinkComponent} />;
}
