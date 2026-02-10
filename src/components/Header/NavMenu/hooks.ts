// next
import { usePathname } from "next/navigation";

// types
import type { Route } from "next";

export const useIsMatchActive = (items: { href: Route; match?: string }[]) => {
  const pathname = usePathname();

  return items.some(({ href, match }) => new RegExp(match ?? `^${href}$`).test(pathname));
};
