// react
import { Suspense } from "react";

// services, features, and other libraries
import LangLoader from "@/lib/LangLoader";

// components
import { NavigationMenu, NavigationMenuList } from "@/components/ui/custom/navigation-menu";
import NavMenuItem from "./NavMenuItem";
import AdminOnly from "@/features/auth/components/AdminOnly";

// types
import type { NavMenuItems } from "@/components/Header/NavMenu/constants";

// constants
import { NAV_MENU_ITEMS } from "@/components/Header/NavMenu/constants";

// Component remains the fast, static shell
export default function NavMenu() {
  return (
    <Suspense fallback={<NavMenuSkeleton />}>
      <NavMenuContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function NavMenuContent() {
  // Create an instance of the lang loader needed for localization
  const { navMenuItems } = await LangLoader.create();

  const [adminOnly, ...rest] = NAV_MENU_ITEMS(navMenuItems);

  return (
    <>
      <AdminOnly>
        <NavigationMenu className="mx-auto uppercase invert">{renderNavMenuList([adminOnly])}</NavigationMenu>
      </AdminOnly>
      <NavigationMenu className="mx-auto uppercase">{renderNavMenuList(rest)}</NavigationMenu>
    </>
  );
}

export function NavMenuSkeleton() {
  return <div className="h-full flex-1" />;
}

function renderNavMenuList(items: NavMenuItems) {
  return (
    <NavigationMenuList className="flex-wrap gap-2 sm:gap-0">
      {items.map((navMenuItem, index) => (
        <NavMenuItem key={index} {...navMenuItem} />
      ))}
    </NavigationMenuList>
  );
}
