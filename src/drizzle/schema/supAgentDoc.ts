// drizzle and db access
import { jsonb, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/helpers";
import { relations } from "drizzle-orm";

// all table definitions (their schemas)
import { SupAgentChunkTable } from "./supAgentChunk";

export const SupAgentDocTable = pgTable("sup_agent_doc", {
  id,
  title: varchar({ length: 50 }).notNull(),
  content: text().notNull(),
  metadata: jsonb(),
  createdAt,
  updatedAt,
});

export const supAgentDocRelations = relations(SupAgentDocTable, ({ many }) => ({
  docChunks: many(SupAgentChunkTable),
}));
