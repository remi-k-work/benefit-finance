// Load environment variables
import "dotenv/config";

// services, features, and other libraries
import { Console, Effect, Layer, Logger, Stream } from "effect";
import { NodeRuntime } from "@effect/platform-node";
import { runSupportAgent } from "@/features/supportAgent/lib/agent";
import { AiSdkError } from "@/lib/errors";

// constants
import { EXAMPLE_QUESTIONS } from "@/features/supportAgent/constants";

const MainLayer = Layer.mergeAll(Logger.pretty);

const main = Effect.gen(function* () {
  yield* Effect.log("Testing the Support Agent...\n" + "=".repeat(50));

  for (const { category, question } of EXAMPLE_QUESTIONS.slice(2, 3)) {
    yield* Effect.log(`\n📝 Category: ${category}`);
    yield* Effect.log(`❓ Question: "${question}"`);

    // Start timer
    const startTime = performance.now();

    // Run the support agent
    const result = yield* runSupportAgent(question);

    // Convert the textStream into an Effect Stream
    const stream = Stream.fromAsyncIterable(result.textStream, (cause) => new AiSdkError({ message: "Failed to read text stream", cause }));

    // Consume the stream
    // We use runForeach to print each chunk as it arrives
    yield* stream.pipe(
      Stream.tap((chunk) => Console.log(chunk)),
      Stream.runDrain,
    );

    // Stop timer
    const duration = (performance.now() - startTime).toFixed(2);

    // for await (const chunk of result.textStream) {
    //   console.log(chunk);
    // }

    yield* Effect.log(`\n✅ Stream Finished`);
    yield* Effect.log(`Time: ${duration}ms`);

    yield* Effect.log("-".repeat(50));
    yield* Effect.log("*** Sleeping for 5 seconds... ***").pipe(Effect.andThen(Effect.sleep(5000)));
  }

  yield* Effect.log("\n🏁 Test Complete");
}).pipe(Effect.provide(MainLayer));

// Use NodeRuntime.runMain for graceful teardown on CTRL+C
NodeRuntime.runMain(main);
