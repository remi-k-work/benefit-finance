// assets
import { BanknotesIcon, UserIcon } from "@heroicons/react/24/outline";

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
    href: "/dashboard",
    match: "^/dashboard(/.*)?$",
    title: "Get Started",
    icon: <BanknotesIcon />,
  },
  {
    href: "/profile",
    match: "^/profile(/.*)?$",
    title: "Profile",
    icon: <UserIcon />,
  },
] as const;
