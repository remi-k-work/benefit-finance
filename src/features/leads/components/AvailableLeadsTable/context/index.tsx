"use client";

// react
import { createContext, use } from "react";

// services, features, and other libraries
import useInstance from "./useInstance";

// types
import type { InstanceContextType, InstanceProviderProps } from "./types";

const InstanceContext = createContext<InstanceContextType | undefined>(undefined);

export function InstanceProvider({ allAvailableLeads, ll, llFormToastFeedback, children }: InstanceProviderProps) {
  const { table, state, actions } = useInstance(allAvailableLeads, ll, llFormToastFeedback);
  return <InstanceContext value={{ allAvailableLeads, ll, llFormToastFeedback, table, state, actions }}>{children}</InstanceContext>;
}

export function useInstanceContext() {
  const context = use(InstanceContext);
  if (context === undefined) throw new Error("useInstanceContext must be used within a InstanceProvider.");
  return context;
}
