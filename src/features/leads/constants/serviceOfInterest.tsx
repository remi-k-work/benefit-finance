// drizzle and db access
import type { ServiceOfInterest } from "@/drizzle/schema/lead";

// components
import { Badge } from "@/components/ui/custom/badge";

// types
import type LangLoader from "@/lib/LangLoader";
import type { ReactNode } from "react";

// constants
export const SERVICE_OF_INTEREST = (ll: typeof LangLoader.prototype.leads) =>
  [
    {
      value: "subsidies",
      label: (
        <Badge variant="outline" className="min-w-42 text-base font-semibold">
          {ll["subsidies"]}
        </Badge>
      ),
    },
    {
      value: "credits",
      label: (
        <Badge variant="outline" className="min-w-42 text-base font-semibold">
          {ll["credits"]}
        </Badge>
      ),
    },
    {
      value: "insurance",
      label: (
        <Badge variant="outline" className="min-w-42 text-base font-semibold">
          {ll["insurance"]}
        </Badge>
      ),
    },
    {
      value: "not sure",
      label: (
        <Badge variant="outline" className="min-w-32 text-base font-semibold">
          {ll["not sure"]}
        </Badge>
      ),
    },
  ] satisfies { value: ServiceOfInterest; label: ReactNode }[];

export const SERVICE_OF_INTEREST_TEXTONLY = (ll: typeof LangLoader.prototype.leads) =>
  [
    {
      value: "subsidies",
      label: ll["subsidies"],
    },
    {
      value: "credits",
      label: ll["credits"],
    },
    {
      value: "insurance",
      label: ll["insurance"],
    },
    {
      value: "not sure",
      label: ll["not sure"],
    },
  ] satisfies { value: ServiceOfInterest; label: string }[];
