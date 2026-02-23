// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// types
import type { ReactNode } from "react";
import type { Table } from "@tanstack/react-table";
import type useState from "./useState";
import type useActions from "./useActions";
import type LangLoader from "@/lib/LangLoader";

export interface InstanceContextType {
  allDocsWithChunks: AllDocsWithChunks[];
  ll: typeof LangLoader.prototype.manSupportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
  table: Table<AllDocsWithChunks>;
  state: ReturnType<typeof useState>;
  actions: ReturnType<typeof useActions>;
}

export interface InstanceProviderProps {
  allDocsWithChunks: AllDocsWithChunks[];
  ll: typeof LangLoader.prototype.manSupportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
  children: ReactNode;
}
