// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { eq } from "drizzle-orm";

// services, features, and other libraries
import { Effect } from "effect";

// all table definitions (their schemas)
import { SupAgentDocTable } from "@/drizzle/schema";

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

    return { getDoc, insertDoc, updateDoc, deleteDoc, deleteAll } as const;
  }),
}) {}
