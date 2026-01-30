// assets
import { BanknotesIcon, UserIcon } from "@heroicons/react/24/outline";

// types
import type LangLoader from "@/lib/LangLoader";

// constants
export const NAV_MENU_ITEMS = (ll: typeof LangLoader.prototype.navMenuItems) =>
  [
    {
      title: ll["Products"],
      items: [
        { title: ll["Spending"], href: "/spending", match: "^/spending(/.*)?$" },
        { title: ll["Investing"], href: "/investing", match: "^/investing(/.*)?$" },
        { title: ll["Forecasting"], href: "/forecasting", match: "^/forecasting(/.*)?$" },
        { title: ll["Estate Planning"], href: "/estate-planning", match: "^/estate-planning(/.*)?$" },
        { title: ll["Couples"], href: "/couples", match: "^/couples(/.*)?$" },
      ],
    },
    {
      title: ll["For Employers"],
      href: "/for-employers",
      match: "^/employers(/.*)?$",
    },
    {
      title: ll["Resources"],
      href: "/resources",
      match: "^/resources(/.*)?$",
    },
  ] as const;

export const NAV_ICON_ITEMS = (ll: typeof LangLoader.prototype.navIconItems) =>
  [
    {
      href: "/dashboard",
      match: "^/dashboard(/.*)?$",
      title: ll["Get Started"],
      icon: <BanknotesIcon />,
    },
    {
      href: "/profile",
      match: "^/profile(/.*)?$",
      title: ll["Profile"],
      icon: <UserIcon />,
    },
  ] as const;

export const NAV_MENU_ITEMS_S = [
  {
    title: "............",
    items: [
      { title: "............", href: "/spending", match: "^/spending(/.*)?$" },
      { title: "............", href: "/investing", match: "^/investing(/.*)?$" },
      { title: "............", href: "/forecasting", match: "^/forecasting(/.*)?$" },
      { title: "............", href: "/estate-planning", match: "^/estate-planning(/.*)?$" },
      { title: "............", href: "/couples", match: "^/couples(/.*)?$" },
    ],
  },
  {
    title: "............",
    href: "/for-employers",
    match: "^/employers(/.*)?$",
  },
  {
    title: "............",
    href: "/resources",
    match: "^/resources(/.*)?$",
  },
] as const;

export const NAV_ICON_ITEMS_S = [
  {
    href: "/dashboard",
    match: "^/dashboard(/.*)?$",
    title: "............",
    icon: <BanknotesIcon />,
  },
  {
    href: "/profile",
    match: "^/profile(/.*)?$",
    title: "............",
    icon: <UserIcon />,
  },
] as const;
