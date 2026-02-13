"use client";

// react
import { createContext, use } from "react";

// services, features, and other libraries
import useInstance from "./useInstance";

// types
import type { InstanceContextType, InstanceProviderProps } from "./types";

const InstanceContext = createContext<InstanceContextType | undefined>(undefined);

export function InstanceProvider({ allDocsWithChunks, ll, children }: InstanceProviderProps) {
  const { table, state, actions } = useInstance(allDocsWithChunks, ll);
  return <InstanceContext value={{ allDocsWithChunks, ll, table, state, actions }}>{children}</InstanceContext>;
}

export function useInstanceContext() {
  const context = use(InstanceContext);
  if (context === undefined) throw new Error("useInstanceContext must be used within a InstanceProvider.");
  return context;
}
