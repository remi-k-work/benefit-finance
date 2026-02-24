// drizzle and db access
import type { AllLeadsForReferrer } from "@/features/leads/db";

// types
import type { ReactNode } from "react";
import type { Table } from "@tanstack/react-table";
import type useState from "./useState";
import type useActions from "./useActions";
import type LangLoader from "@/lib/LangLoader";

export interface InstanceContextType {
  allLeadsForReferrer: AllLeadsForReferrer[];
  ll: typeof LangLoader.prototype.leads;
  table: Table<AllLeadsForReferrer>;
  state: ReturnType<typeof useState>;
  actions: ReturnType<typeof useActions>;
}

export interface InstanceProviderProps {
  allLeadsForReferrer: AllLeadsForReferrer[];
  ll: typeof LangLoader.prototype.leads;
  children: ReactNode;
}
