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
        { title: ll["Users"], href: "/manager/users", match: "^/manager/users(/.*)?$" },
        { title: ll["Leads"], href: "/manager/leads", match: "^/manager/leads(/.*)?$" },
      ],
    },

    { title: ll["Subsidies"], href: "/subsidies", match: "^/subsidies(/.*)?$" },
    {
      title: ll["Credits"],
      items: [
        { title: ll["For Individuals"], href: "/credits-for-individuals", match: "^/credits-for-individuals(/.*)?$" },
        { title: ll["For Companies"], href: "/credits-for-companies", match: "^/credits-for-companies(/.*)?$" },
      ],
    },
    {
      title: ll["Insurance"],
      items: [
        { title: ll["Financial"], href: "/financial-insurance", match: "^/financial-insurance(/.*)?$" },
        { title: ll["Business"], href: "/business-insurance", match: "^/business-insurance(/.*)?$" },
        { title: ll["Property"], href: "/property-insurance", match: "^/property-insurance(/.*)?$" },
        { title: ll["Life and Health"], href: "/life-and-health-insurance", match: "^/life-and-health-insurance(/.*)?$" },
        { title: ll["Motor"], href: "/motor-insurance", match: "^/motor-insurance(/.*)?$" },
        { title: ll["Travel"], href: "/travel-insurance", match: "^/travel-insurance(/.*)?$" },
      ],
    },
    { title: ll["Contact Us"], href: "/contact-us", match: "^/contact-us(/.*)?$" },
  ] as const;
