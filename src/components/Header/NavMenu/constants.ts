// types
import type LangLoader from "@/lib/LangLoader";
export type NavMenuItems = ReturnType<typeof NAV_MENU_ITEMS> | typeof NAV_MENU_ITEMS_S;

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
      title: ll["Get Started"],
      href: "/sign-in?redirect=/dashboard",
      match: "^/dashboard(/.*)?$",
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
    href: "/sign-in?redirect=/dashboard",
    match: "^/dashboard(/.*)?$",
  },
] as const;
