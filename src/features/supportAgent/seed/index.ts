// Load environment variables
import "dotenv/config";

// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { SupAgentChunkDB, SupAgentDocDB } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect, Layer, Logger } from "effect";
import { NodeRuntime } from "@effect/platform-node";
import { generateDocEmbeddings } from "@/features/supportAgent/lib/embeddings";

// constants
import { SUP_AGENT_DOC } from "./constants";

const MainLayer = Layer.mergeAll(Logger.pretty, DB.Default, SupAgentDocDB.Default, SupAgentChunkDB.Default);

const main = Effect.gen(function* () {
  const db = yield* DB;
  const supAgentDocDB = yield* SupAgentDocDB;
  const supAgentChunkDB = yield* SupAgentChunkDB;

  yield* Effect.log("Seeding the Support Agent...");

  // Run all db operations in a transaction
  yield* db.transaction(
    Effect.gen(function* () {
      // Delete all documents
      yield* Effect.log("Removing all existing documents").pipe(Effect.andThen(supAgentDocDB.deleteAll));

      let docNr = 1;
      for (const docContent of SUP_AGENT_DOC) {
        // Insert a new document
        const wordCount = docContent.split(/\s+/).length;
        yield* Effect.log(`Seeding with document ${docNr} that has ${wordCount} words`).pipe(
          Effect.andThen(supAgentDocDB.insertDoc({ content: docContent })),
          Effect.tap(([{ id }]) => Effect.log(`Document ID: ${id}`)),
          Effect.andThen(([{ id }]) =>
            // Generate embeddings for a document
            Effect.log(`Generating embeddings for document ${id}...`).pipe(
              Effect.andThen(generateDocEmbeddings(docContent)),
              Effect.tap((docEmbeddings) => Effect.log(`Document embeddings/chunks: ${docEmbeddings.length}`)),
              // Insert multiple new chunks for a document
              Effect.andThen((docEmbeddings) => supAgentChunkDB.insertChunks(id, docEmbeddings)),
            ),
          ),
        );
        docNr++;
      }
    }),
  );

  yield* Effect.log("Seeding complete ✅");
}).pipe(Effect.provide(MainLayer));

// Use NodeRuntime.runMain for graceful teardown on CTRL+C
NodeRuntime.runMain(main);
