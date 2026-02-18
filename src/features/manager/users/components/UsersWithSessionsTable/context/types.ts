// drizzle and db access
import type { AllUsersWithSessions } from "@/features/manager/users/db";

// types
import type { ReactNode } from "react";
import type { Session } from "@/services/better-auth/auth";
import type { Table } from "@tanstack/react-table";
import type useState from "./useState";
import type useActions from "./useActions";
import type LangLoader from "@/lib/LangLoader";

export interface InstanceContextType {
  session: Session;
  allUsersWithSessions: AllUsersWithSessions[];
  ll: typeof LangLoader.prototype.manUsers;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
  table: Table<AllUsersWithSessions>;
  state: ReturnType<typeof useState>;
  actions: ReturnType<typeof useActions>;
}

export interface InstanceProviderProps {
  session: Session;
  allUsersWithSessions: AllUsersWithSessions[];
  ll: typeof LangLoader.prototype.manUsers;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
  children: ReactNode;
}
