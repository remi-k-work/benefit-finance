// Load environment variables
import "dotenv/config";

// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { searchDocChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect, Layer, Logger } from "effect";
import { NodeRuntime } from "@effect/platform-node";

// constants
import { EXAMPLE_QUESTIONS } from "@/features/supportAgent/constants";

const MainLayer = Layer.mergeAll(Logger.pretty, DB.Default);

const main = Effect.gen(function* () {
  yield* Effect.log("Testing retrieval...\n" + "=".repeat(50));

  for (const { category, question } of EXAMPLE_QUESTIONS) {
    yield* Effect.log(`\n📝 Category: ${category}`);
    yield* Effect.log(`❓ Question: "${question}"`);

    // Start timer
    const startTime = performance.now();

    // EXECUTE RETRIEVAL
    // We ask for top 3 results to see if the ranking logic is working
    const results = yield* searchDocChunks(question, 3);

    // Stop timer
    const duration = (performance.now() - startTime).toFixed(2);

    if (results.length === 0) {
      yield* Effect.log(`❌ No relevant chunks found (Time: ${duration}ms)`);
      yield* Effect.log("-".repeat(50));
      continue;
    }

    yield* Effect.log(`✅ Found ${results.length} chunks (Time: ${duration}ms):`);

    // Print formatted results
    for (const [i, result] of results.entries()) {
      const score = (result.similarity * 100).toFixed(1);
      const title = result.docTitle;

      // Truncate chunk text for readability in console
      const snippet = result.chunk.replace(/\n/g, " ").substring(0, 100) + "...";

      yield* Effect.log(`   ${i + 1}. [${score}%] [${title}]`);
      yield* Effect.log(`      "${snippet}"`);
    }

    yield* Effect.log("-".repeat(50));
  }

  yield* Effect.log("\n🏁 Test Complete");
}).pipe(Effect.provide(MainLayer));

// Use NodeRuntime.runMain for graceful teardown on CTRL+C
NodeRuntime.runMain(main);
