// drizzle and db access
import { index, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/helpers";
import { relations } from "drizzle-orm";

// all table definitions (their schemas)
import { UserTable } from "./auth";

export const serviceOfInterestEnum = pgEnum("lead_service_of_interest", ["subsidies", "credits", "insurance", "not sure"]);
export const statusEnum = pgEnum("lead_status", ["during", "accepted", "rejected"]);

export const LeadTable = pgTable(
  "lead",
  {
    id,

    // Who referred them (logged-in user)
    referredBy: text()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),

    // The lead (potential client)
    firstName: varchar({ length: 50 }).notNull(),
    lastName: varchar({ length: 50 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 50 }).notNull(),
    serviceOfInterest: serviceOfInterestEnum().notNull().default("not sure"),

    status: statusEnum().notNull().default("during"),
    internalNotes: varchar({ length: 2048 }),
    createdAt,
    updatedAt,
  },
  (table) => [index("lead_referred_by_idx").on(table.referredBy)],
);

export const leadRelations = relations(LeadTable, ({ one }) => ({ referrer: one(UserTable, { fields: [LeadTable.referredBy], references: [UserTable.id] }) }));
