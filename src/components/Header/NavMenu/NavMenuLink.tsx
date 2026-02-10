"use client";

// next
import Link from "next/link";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { useIsMatchActive } from "./hooks";

// components
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/custom/navigation-menu";

// types
import type { Route } from "next";

interface NavMenuLinkProps {
  title: string;
  href?: Route;
  match?: string;
  isMainLevel?: boolean;
}

export default function NavMenuLink({ title, href = "#", match, isMainLevel = false }: NavMenuLinkProps) {
  const isActive = useIsMatchActive([{ href, match }]);

  return (
    <NavigationMenuLink
      className={cn(isMainLevel && navigationMenuTriggerStyle(), isActive && "bg-accent text-accent-foreground")}
      render={
        <Link href={href} className={cn(isActive && "bg-accent text-accent-foreground")}>
          {title}
        </Link>
      }
    />
  );
}
