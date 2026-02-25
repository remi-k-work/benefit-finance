// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// types
import type { ReactNode } from "react";
import type { Table } from "@tanstack/react-table";
import type useState from "./useState";
import type useActions from "./useActions";
import type LangLoader from "@/lib/LangLoader";

export interface InstanceContextType {
  allAvailableLeads: AllAvailableLeads[];
  ll: typeof LangLoader.prototype.leads;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
  table: Table<AllAvailableLeads>;
  state: ReturnType<typeof useState>;
  actions: ReturnType<typeof useActions>;
}

export interface InstanceProviderProps {
  allAvailableLeads: AllAvailableLeads[];
  ll: typeof LangLoader.prototype.leads;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
  children: ReactNode;
}
