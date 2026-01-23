// drizzle and db access
import { relations } from "drizzle-orm";

// all table definitions (their schemas)
import { AccountTable, SessionTable, UserTable } from "./auth";
import { AvatarTable } from "./avatar";

export const userRelations = relations(UserTable, ({ one, many }) => ({
  avatar: one(AvatarTable, { fields: [UserTable.id], references: [AvatarTable.userId] }),
  sessions: many(SessionTable),
  accounts: many(AccountTable),
}));

export const sessionRelations = relations(SessionTable, ({ one }) => ({
  user: one(UserTable, { fields: [SessionTable.userId], references: [UserTable.id] }),
}));

export const accountRelations = relations(AccountTable, ({ one }) => ({
  user: one(UserTable, { fields: [AccountTable.userId], references: [UserTable.id] }),
}));
