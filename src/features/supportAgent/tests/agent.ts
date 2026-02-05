// Load environment variables
import "dotenv/config";

// services, features, and other libraries
import { Effect, Layer, Logger } from "effect";
import { NodeRuntime } from "@effect/platform-node";
import { supportAgent } from "@/features/supportAgent/lib/agent";

// constants
import { EXAMPLE_QUESTIONS } from "@/features/supportAgent/constants";

const MainLayer = Layer.mergeAll(Logger.pretty);

const main = Effect.gen(function* () {
  yield* Effect.log("Testing the Support Agent...\n" + "=".repeat(50));

  for (const { category, question } of EXAMPLE_QUESTIONS.slice(3, 4)) {
    yield* Effect.log(`\n📝 Category: ${category}`);
    yield* Effect.log(`❓ Question: "${question}"`);

    // Start timer
    const startTime = performance.now();

    // Execute the support agent
    const result = yield* Effect.promise(() =>
      supportAgent.generate({
        prompt: question,
        onStepFinish: async ({ usage, finishReason, toolCalls }) => {
          console.log("Step completed:", {
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            finishReason,
            toolsUsed: toolCalls?.map((tc) => tc.toolName),
          });
        },
      }),
    );

    // Stop timer
    const duration = (performance.now() - startTime).toFixed(2);

    yield* Effect.log(`Answer: "${result.text}"`);
    yield* Effect.log(`Time: ${duration}ms`);

    yield* Effect.log("-".repeat(50));
    yield* Effect.log("*** Sleeping for 5 seconds... ***").pipe(Effect.andThen(Effect.sleep(5000)));
  }

  yield* Effect.log("\n🏁 Test Complete");
}).pipe(Effect.provide(MainLayer));

// Use NodeRuntime.runMain for graceful teardown on CTRL+C
NodeRuntime.runMain(main);
