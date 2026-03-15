// components
import { Badge } from "@/components/ui/custom/badge";

// types
import type LangLoader from "@/lib/LangLoader";
import type { Role } from "@/services/better-auth/auth";
import type { ReactNode } from "react";

// constants
export const ROLES = (ll: typeof LangLoader.prototype.users) =>
  [
    { value: "user", label: <Badge className="min-w-48 text-base font-semibold">{ll["user"]}</Badge> },
    {
      value: "admin",
      label: (
        <Badge variant="destructive" className="min-w-48 text-base font-semibold">
          {ll["admin"]}
        </Badge>
      ),
    },
    {
      value: "demo",
      label: (
        <Badge variant="secondary" className="min-w-48 text-base font-semibold">
          {ll["demo"]}
        </Badge>
      ),
    },
  ] satisfies { value: Role; label: ReactNode }[];
