// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { eq } from "drizzle-orm";

// services, features, and other libraries
import { Effect } from "effect";

// all table definitions (their schemas)
import { SupAgentChunkTable } from "@/drizzle/schema";

export class SupAgentChunkDB extends Effect.Service<SupAgentChunkDB>()("SupAgentChunkDB", {
  dependencies: [DB.Default],

  effect: Effect.gen(function* () {
    const { execute } = yield* DB;

    // Get a single chunk
    const getChunk = (id: string) => execute((dbOrTx) => dbOrTx.query.SupAgentChunkTable.findFirst({ where: eq(SupAgentChunkTable.id, id) }));

    // Insert a new chunk for a document
    const insertChunk = (docId: string, data: Omit<typeof SupAgentChunkTable.$inferInsert, "docId">) =>
      execute((dbOrTx) => dbOrTx.insert(SupAgentChunkTable).values({ docId, ...data }));

    // Insert multiple new chunks for a document
    const insertChunks = (docId: string, data: Omit<typeof SupAgentChunkTable.$inferInsert, "docId">[]) =>
      execute((dbOrTx) => dbOrTx.insert(SupAgentChunkTable).values(data.map((chunk) => ({ docId, ...chunk }))));

    // Delete all chunks for a document
    const deleteChunks = (docId: string) => execute((dbOrTx) => dbOrTx.delete(SupAgentChunkTable).where(eq(SupAgentChunkTable.docId, docId)));

    return { getChunk, insertChunk, insertChunks, deleteChunks } as const;
  }),
}) {}
