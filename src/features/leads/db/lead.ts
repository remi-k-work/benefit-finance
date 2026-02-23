// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { desc, eq } from "drizzle-orm";

// services, features, and other libraries
import { Effect } from "effect";

// all table definitions (their schemas)
import { LeadTable } from "@/drizzle/schema";

// types
export type Lead = Exclude<Effect.Effect.Success<ReturnType<typeof LeadDB.prototype.getLead>>, undefined>;
export type AllLeadsForReferrer = Effect.Effect.Success<ReturnType<typeof LeadDB.prototype.allLeadsForReferrer>>[number];

export class LeadDB extends Effect.Service<LeadDB>()("LeadDB", {
  dependencies: [DB.Default],

  effect: Effect.gen(function* () {
    const { execute } = yield* DB;

    // Get a single lead
    const getLead = (id: string) => execute((dbOrTx) => dbOrTx.query.LeadTable.findFirst({ where: eq(LeadTable.id, id) }));

    // Insert a new lead
    const insertLead = (data: typeof LeadTable.$inferInsert) => execute((dbOrTx) => dbOrTx.insert(LeadTable).values(data).returning({ id: LeadTable.id }));

    // Update a lead
    const updateLead = (id: string, data: Partial<Omit<typeof LeadTable.$inferInsert, "id">>) =>
      execute((dbOrTx) => dbOrTx.update(LeadTable).set(data).where(eq(LeadTable.id, id)));

    // Delete a lead
    const deleteLead = (id: string) => execute((dbOrTx) => dbOrTx.delete(LeadTable).where(eq(LeadTable.id, id)));

    // Delete all leads
    const deleteAll = execute((dbOrTx) => dbOrTx.delete(LeadTable));

    // Get all leads for a referrer
    const allLeadsForReferrer = (referredBy: string) =>
      execute((dbOrTx) =>
        dbOrTx.query.LeadTable.findMany({
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            serviceOfInterest: true,
            status: true,
            createdAt: true,
          },
          where: eq(LeadTable.referredBy, referredBy),
          orderBy: desc(LeadTable.createdAt),
        }),
      );

    return { getLead, insertLead, updateLead, deleteLead, deleteAll, allLeadsForReferrer } as const;
  }),
}) {}
