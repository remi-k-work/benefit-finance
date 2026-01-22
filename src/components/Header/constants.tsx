// assets
import { LightBulbIcon, UserIcon } from "@heroicons/react/24/outline";

// types
import type { Route } from "next";

// constants
export const NAV_MENU_ITEMS = [
  {
    title: "Products",
    items: [
      { title: "Spending", href: "/spending", match: "^/spending(/.*)?$" },
      { title: "Investing", href: "/investing", match: "^/investing(/.*)?$" },
      { title: "Forecasting", href: "/forecasting", match: "^/forecasting(/.*)?$" },
      { title: "Estate Planning", href: "/estate-planning", match: "^/estate-planning(/.*)?$" },
      { title: "Couples", href: "/couples", match: "^/couples(/.*)?$" },
    ],
  },
  {
    title: "For Employers",
    href: "/for-employers",
    match: "^/employers(/.*)?$",
  },
  {
    title: "Resources",
    href: "/resources",
    match: "^/resources(/.*)?$",
  },
] as const;

export const NAV_ICON_ITEMS = [
  {
    href: "/",
    match: "^/dashboard(/.*)?$",
    title: "Dashboard",
    icon: <LightBulbIcon />,
  },
  {
    href: "/" as Route,
    match: "^/profile(/.*)?$",
    title: "Profile",
    icon: <UserIcon />,
  },
] as const;
