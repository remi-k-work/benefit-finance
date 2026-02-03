// drizzle and db access
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "@/drizzle/helpers";
import { relations } from "drizzle-orm";

// all table definitions (their schemas)
import { SupAgentChunkTable } from "./supAgentChunk";

export const SupAgentDocTable = pgTable("sup_agent_doc", {
  id,
  content: text().notNull(),
  createdAt,
  updatedAt,
});

export const supAgentDocRelations = relations(SupAgentDocTable, ({ many }) => ({
  docChunks: many(SupAgentChunkTable),
}));
