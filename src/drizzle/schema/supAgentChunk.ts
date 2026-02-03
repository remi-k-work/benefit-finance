// drizzle and db access
import { index, pgTable, text, uuid, vector } from "drizzle-orm/pg-core";
import { id } from "@/drizzle/helpers";
import { relations } from "drizzle-orm";

// all table definitions (their schemas)
import { SupAgentDocTable } from "./supAgentDoc";

export const SupAgentChunkTable = pgTable(
  "sup_agent_chunk",
  {
    id,
    docId: uuid()
      .notNull()
      .references(() => SupAgentDocTable.id, { onDelete: "cascade" }),
    chunk: text().notNull(),
    embedding: vector({ dimensions: 1536 }).notNull(),
  },
  (table) => [index("doc_id_idx").on(table.docId), index("embedding_idx").using("hnsw", table.embedding.op("vector_cosine_ops"))],
);

export const supAgentChunkRelations = relations(SupAgentChunkTable, ({ one }) => ({
  doc: one(SupAgentDocTable, { fields: [SupAgentChunkTable.docId], references: [SupAgentDocTable.id] }),
}));
