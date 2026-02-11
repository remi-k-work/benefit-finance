// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { asc, eq } from "drizzle-orm";

// services, features, and other libraries
import { Effect } from "effect";

// all table definitions (their schemas)
import { SupAgentDocTable } from "@/drizzle/schema";

// types
export type AllDocsWithChunks = Effect.Effect.Success<typeof SupAgentDocDB.prototype.allDocsWithChunks>;

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
      dbOrTx.query.SupAgentDocTable.findMany({ orderBy: asc(SupAgentDocTable.title), with: { docChunks: { columns: { chunk: true } } } }),
    );

    return { getDoc, insertDoc, updateDoc, deleteDoc, deleteAll, allDocsWithChunks } as const;
  }),
}) {}
