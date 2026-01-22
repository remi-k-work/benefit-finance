// components
import { NavigationMenu, NavigationMenuList } from "@/components/ui/custom/navigation-menu";
import NavMenuItem from "./NavMenuItem";

// constants
import { NAV_MENU_ITEMS } from "@/components/Header/constants";

export default function NavMenu() {
  return (
    <NavigationMenu className="mx-auto uppercase">
      <NavigationMenuList>
        {NAV_MENU_ITEMS.map((navMenuItem, index) => (
          <NavMenuItem key={index} {...navMenuItem} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
