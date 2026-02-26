// Load environment variables
import "dotenv/config";

// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect, Layer, Logger } from "effect";
import { NodeRuntime } from "@effect/platform-node";

// constants
import { LEAD } from "@/features/leads/constants";

const MainLayer = Layer.mergeAll(Logger.pretty, DB.Default, LeadDB.Default);

const main = Effect.gen(function* () {
  const db = yield* DB;
  const leadDB = yield* LeadDB;

  yield* Effect.log("Seeding the Leads...");

  // Run all db operations in a transaction
  yield* db.transaction(
    Effect.gen(function* () {
      // Delete all documents
      yield* Effect.log("Removing all existing leads").pipe(Effect.andThen(leadDB.deleteAll));

      for (const { referredByEmail, firstName, lastName, email, phone, serviceOfInterest, status, internalNotes } of LEAD("penny.saver@benefit.demo")) {
        // Find the referrer id from email
        const referredBy = yield* leadDB.findReferrerId(referredByEmail);
        if (!referredBy) {
          yield* Effect.logWarning(`Referrer "${referredByEmail}" not found`);
          continue;
        }

        // Insert a new lead
        yield* Effect.log(`Seeding with lead "${firstName} ${lastName}" referred by ${referredByEmail} (${referredBy.id})`).pipe(
          Effect.andThen(leadDB.insertLead({ referredBy: referredBy.id, firstName, lastName, email, phone, serviceOfInterest, status, internalNotes })),
          Effect.tap(([{ id }]) => Effect.log(`Lead ID: ${id}`)),
        );
      }

      for (const { referredByEmail, firstName, lastName, email, phone, serviceOfInterest, status, internalNotes } of LEAD("cash.flow@benefit.demo")) {
        // Find the referrer id from email
        const referredBy = yield* leadDB.findReferrerId(referredByEmail);
        if (!referredBy) {
          yield* Effect.logWarning(`Referrer "${referredByEmail}" not found`);
          continue;
        }

        // Insert a new lead
        yield* Effect.log(`Seeding with lead "${firstName} ${lastName}" referred by ${referredByEmail} (${referredBy.id})`).pipe(
          Effect.andThen(leadDB.insertLead({ referredBy: referredBy.id, firstName, lastName, email, phone, serviceOfInterest, status, internalNotes })),
          Effect.tap(([{ id }]) => Effect.log(`Lead ID: ${id}`)),
        );
      }

      for (const { referredByEmail, firstName, lastName, email, phone, serviceOfInterest, status, internalNotes } of LEAD("ivy.ledger@benefit.demo")) {
        // Find the referrer id from email
        const referredBy = yield* leadDB.findReferrerId(referredByEmail);
        if (!referredBy) {
          yield* Effect.logWarning(`Referrer "${referredByEmail}" not found`);
          continue;
        }

        // Insert a new lead
        yield* Effect.log(`Seeding with lead "${firstName} ${lastName}" referred by ${referredByEmail} (${referredBy.id})`).pipe(
          Effect.andThen(leadDB.insertLead({ referredBy: referredBy.id, firstName, lastName, email, phone, serviceOfInterest, status, internalNotes })),
          Effect.tap(([{ id }]) => Effect.log(`Lead ID: ${id}`)),
        );
      }
    }),
  );

  yield* Effect.log("Seeding complete ✅");
}).pipe(Effect.provide(MainLayer));

// Use NodeRuntime.runMain for graceful teardown on CTRL+C
NodeRuntime.runMain(main);
