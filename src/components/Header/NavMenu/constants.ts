// types
import type LangLoader from "@/lib/LangLoader";
export type NavMenuItems = ReturnType<typeof NAV_MENU_ITEMS> | typeof NAV_MENU_ITEMS_S;

// constants
export const NAV_MENU_ITEMS = (ll: typeof LangLoader.prototype.navMenuItems) =>
  [
    { title: ll["Subsidies"], href: "/subsidies", match: "^/subsidies(/.*)?$" },
    {
      title: ll["Credits"],
      items: [
        { title: ll["Credits for Individuals"], href: "/credits-for-individuals", match: "^/credits-for-individuals(/.*)?$" },
        { title: ll["Credits for Companies"], href: "/credits-for-companies", match: "^/credits-for-companies(/.*)?$" },
        // { title: ll["Estate Planning"], href: "/estate-planning", match: "^/estate-planning(/.*)?$" },
        // { title: ll["Couples"], href: "/couples", match: "^/couples(/.*)?$" },
      ],
    },
    { title: ll["Contact Us"], href: "/contact-us", match: "^/contact-us(/.*)?$" },
    { title: ll["Get Started"], href: "/sign-in?redirect=/dashboard", match: "^/dashboard(/.*)?$" },
  ] as const;

export const NAV_MENU_ITEMS_S = [
  { title: "............", href: "/subsidies", match: "^/subsidies(/.*)?$" },
  {
    title: "............",
    items: [
      { title: "............", href: "/credits-for-individuals", match: "^/credits-for-individuals(/.*)?$" },
      { title: "............", href: "/credits-for-companies", match: "^/credits-for-companies(/.*)?$" },
      // { title: "............", href: "/estate-planning", match: "^/estate-planning(/.*)?$" },
      // { title: "............", href: "/couples", match: "^/couples(/.*)?$" },
    ],
  },
  { title: "............", href: "/contact-us", match: "^/contact-us(/.*)?$" },
  { title: "............", href: "/sign-in?redirect=/dashboard", match: "^/dashboard(/.*)?$" },
] as const;
