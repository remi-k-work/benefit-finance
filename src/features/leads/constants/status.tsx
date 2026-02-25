// drizzle and db access
import type { Status } from "@/drizzle/schema/lead";

// components
import { Badge } from "@/components/ui/custom/badge";

// types
import type LangLoader from "@/lib/LangLoader";
import type { ReactNode } from "react";

// constants
export const STATUS = (ll: typeof LangLoader.prototype.leads) =>
  [
    {
      value: "during",
      label: (
        <Badge variant="secondary" className="min-w-42 text-base font-semibold">
          {ll["during"]}
        </Badge>
      ),
    },
    {
      value: "accepted",
      label: <Badge className="min-w-42 text-base font-semibold">{ll["accepted"]}</Badge>,
    },
    {
      value: "rejected",
      label: (
        <Badge variant="destructive" className="min-w-42 text-base font-semibold">
          {ll["rejected"]}
        </Badge>
      ),
    },
  ] satisfies { value: Status; label: ReactNode }[];
