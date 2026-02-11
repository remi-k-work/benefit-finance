// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// types
import type { ReactNode } from "react";
import type { Table } from "@tanstack/react-table";
import type useState from "./useState";
import type useActions from "./useActions";

export interface InstanceContextType {
  allDocsWithChunks: AllDocsWithChunks[];

  table: Table<AllDocsWithChunks>;
  state: ReturnType<typeof useState>;
  actions: ReturnType<typeof useActions>;
}

export interface InstanceProviderProps {
  allDocsWithChunks: AllDocsWithChunks[];
  children: ReactNode;
}
