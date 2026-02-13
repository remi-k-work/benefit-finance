// types
import type LangLoader from "@/lib/LangLoader";
type NavMenuItem = ReturnType<typeof NAV_MENU_ITEMS>[number];
export type NavMenuItems = readonly NavMenuItem[];

// constants
export const NAV_MENU_ITEMS = (ll: typeof LangLoader.prototype.navMenuItems) =>
  [
    {
      title: ll["Manager"],
      items: [
        { title: ll["Support Agent"], href: "/manager/support-agent", match: "^/manager/support-agent(/.*)?$" },
        { title: ll["Users and Roles"], href: "#", match: "^/manager/users-and-roles(/.*)?$" },
        { title: ll["Blog and Articles"], href: "#", match: "^/manager/blog-and-articles(/.*)?$" },
        { title: ll["Refferals and Leads"], href: "#", match: "^/manager/refferals-and-leads(/.*)?$" },
      ],
    },

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
