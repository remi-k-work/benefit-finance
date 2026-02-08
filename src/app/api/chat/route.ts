// services, features, and other libraries
import { Effect } from "effect";
import { convertToModelMessages, createAgentUIStreamResponse } from "ai";
import { RuntimeServer } from "@/lib/RuntimeServer";
import { supportAgent, runSupportAgent } from "@/features/supportAgent/lib/agent";

// types
import type { ModelMessage } from "ai";
import type { SupportAgentUIMessage } from "@/features/supportAgent/lib/agent";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const main = (modelMessages: ModelMessage[]) =>
  Effect.gen(function* () {
    // Run the support agent
    const result = yield* runSupportAgent(modelMessages);
    return result;
  });

export async function POST(req: Request) {
  const { messages }: { messages: SupportAgentUIMessage[] } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  const result = await RuntimeServer.runPromise(main(modelMessages));
  return result.toUIMessageStreamResponse();
  // return createAgentUIStreamResponse({ agent: supportAgent, uiMessages: messages });
}
