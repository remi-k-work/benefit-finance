// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { desc, eq, sql } from "drizzle-orm";

// services, features, and other libraries
import { Effect } from "effect";

// all table definitions (their schemas)
import { SupAgentChunkTable, SupAgentDocTable } from "@/drizzle/schema";

// types
export type Doc = Exclude<Effect.Effect.Success<ReturnType<typeof SupAgentDocDB.prototype.getDoc>>, undefined>;
export type AllDocsWithChunks = Effect.Effect.Success<typeof SupAgentDocDB.prototype.allDocsWithChunks>[number];

export class SupAgentDocDB extends Effect.Service<SupAgentDocDB>()("SupAgentDocDB", {
  dependencies: [DB.Default],

  effect: Effect.gen(function* () {
    const { execute } = yield* DB;

    // Get a single document
    const getDoc = (id: string) => execute((dbOrTx) => dbOrTx.query.SupAgentDocTable.findFirst({ where: eq(SupAgentDocTable.id, id) }));

    // Insert a new document
    const insertDoc = (data: typeof SupAgentDocTable.$inferInsert) =>
      execute((dbOrTx) => dbOrTx.insert(SupAgentDocTable).values(data).returning({ id: SupAgentDocTable.id }));

    // Update a document
    const updateDoc = (id: string, data: Partial<Omit<typeof SupAgentDocTable.$inferInsert, "id">>) =>
      execute((dbOrTx) => dbOrTx.update(SupAgentDocTable).set(data).where(eq(SupAgentDocTable.id, id)));

    // Delete a document
    const deleteDoc = (id: string) => execute((dbOrTx) => dbOrTx.delete(SupAgentDocTable).where(eq(SupAgentDocTable.id, id)));

    // Delete all documents
    const deleteAll = execute((dbOrTx) => dbOrTx.delete(SupAgentDocTable));

    // Get all documents with their corresponding chunks (used by the tanstack table)
    const allDocsWithChunks = execute((dbOrTx) =>
      dbOrTx.query.SupAgentDocTable.findMany({
        orderBy: desc(SupAgentDocTable.createdAt),
        with: { docChunks: { columns: { chunk: true } } },
        extras: {
          // We use a subquery to count chunks where the foreign key matches
          chunkCount: sql<number>`(SELECT count(*) FROM ${SupAgentChunkTable} as "chunks" WHERE "chunks"."doc_id" = ${SupAgentDocTable.id})`
            .mapWith(Number)
            .as("chunk_count"),
        },
      }),
    );

    return { getDoc, insertDoc, updateDoc, deleteDoc, deleteAll, allDocsWithChunks } as const;
  }),
}) {}
