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
      ],
    },
    {
      title: ll["Insurance"],
      items: [
        { title: ll["Financial Insurance"], href: "/financial-insurance", match: "^/financial-insurance(/.*)?$" },
        { title: ll["Business Insurance"], href: "/business-insurance", match: "^/business-insurance(/.*)?$" },
        { title: ll["Property Insurance"], href: "/property-insurance", match: "^/property-insurance(/.*)?$" },
        { title: ll["Life and Health Insurance"], href: "/life-and-health-insurance", match: "^/life-and-health-insurance(/.*)?$" },
        { title: ll["Motor Insurance"], href: "/motor-insurance", match: "^/motor-insurance(/.*)?$" },
        { title: ll["Travel Insurance"], href: "/travel-insurance", match: "^/travel-insurance(/.*)?$" },
      ],
    },
    { title: ll["Contact Us"], href: "/contact-us", match: "^/contact-us(/.*)?$" },
  ] as const;

export const NAV_MENU_ITEMS_S = [
  { title: "............", href: "/subsidies", match: "^/subsidies(/.*)?$" },
  {
    title: "............",
    items: [
      { title: "............", href: "/credits-for-individuals", match: "^/credits-for-individuals(/.*)?$" },
      { title: "............", href: "/credits-for-companies", match: "^/credits-for-companies(/.*)?$" },
    ],
  },
  {
    title: "............",
    items: [
      { title: "............", href: "/financial-insurance", match: "^/financial-insurance(/.*)?$" },
      { title: "............", href: "/business-insurance", match: "^/business-insurance(/.*)?$" },
      { title: "............", href: "/property-insurance", match: "^/property-insurance(/.*)?$" },
      { title: "............", href: "/life-and-health-insurance", match: "^/life-and-health-insurance(/.*)?$" },
      { title: "............", href: "/motor-insurance", match: "^/motor-insurance(/.*)?$" },
      { title: "............", href: "/travel-insurance", match: "^/travel-insurance(/.*)?$" },
    ],
  },
  { title: "............", href: "/contact-us", match: "^/contact-us(/.*)?$" },
] as const;
