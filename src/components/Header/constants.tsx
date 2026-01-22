// assets
import { DocumentDuplicateIcon, LightBulbIcon, UserIcon } from "@heroicons/react/24/outline";

// constants
export const NAV_ITEMS = [
  {
    href: "/",
    match: "^/dashboard(/.*)?$",
    title: "Dashboard",
    icon: <LightBulbIcon />,
  },
  {
    href: "/",
    match: "^/notes(/.*)?$",
    title: "Notes",
    icon: <DocumentDuplicateIcon />,
  },
  {
    href: "/",
    match: "^/profile(/.*)?$",
    title: "Profile",
    icon: <UserIcon />,
  },
] as const;
