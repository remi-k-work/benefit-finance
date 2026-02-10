// react
import { Suspense } from "react";

// services, features, and other libraries
import LangLoader from "@/lib/LangLoader";

// components
import { NavigationMenu, NavigationMenuList } from "@/components/ui/custom/navigation-menu";
import NavMenuItem from "./NavMenuItem";

// constants
import { NAV_MENU_ITEMS, NAV_MENU_ITEMS_S } from "@/components/Header/constants";

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

  return (
    <NavigationMenu className="mx-auto uppercase">
      {renderNavMenuList(NAV_MENU_ITEMS(navMenuItems))}
    </NavigationMenu>
  );
}

export function NavMenuSkeleton() {
  return (
    <NavigationMenu className="mx-auto text-transparent uppercase">
      {renderNavMenuList(NAV_MENU_ITEMS_S)}
    </NavigationMenu>
  );
}

function renderNavMenuList(items: typeof NAV_MENU_ITEMS_S) {
  return (
    <NavigationMenuList className="flex-wrap gap-2 sm:gap-0">
      {items.map((navMenuItem, index) => (
        <NavMenuItem key={index} {...navMenuItem} />
      ))}
    </NavigationMenuList>
  );
}
