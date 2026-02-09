// services, features, and other libraries
import { Effect } from "effect";
import { convertToModelMessages } from "ai";
import { RuntimeServer } from "@/lib/RuntimeServer";
import { runSupportAgent } from "@/features/supportAgent/lib/agent";

// types
import type { ModelMessage } from "ai";
import type { SupportAgentUIMessage } from "@/features/supportAgent/lib/agent";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const main = (modelMessages: ModelMessage[]) =>
  Effect.gen(function* () {
    // Run the support agent using a fallback chain of models
    const { response } = yield* runSupportAgent(modelMessages);
    return response;
  }).pipe(
    Effect.scoped,
    Effect.catchAll((error) => Effect.logError(`Support agent recovering from ${error._tag}`)),
  );

export async function POST(req: Request) {
  const { messages }: { messages: SupportAgentUIMessage[] } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  return await RuntimeServer.runPromise(main(modelMessages));
}
