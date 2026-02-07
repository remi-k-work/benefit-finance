// services, features, and other libraries
import { createAgentUIStreamResponse } from "ai";
import { supportAgent } from "@/features/supportAgent/lib/agent";

// types
import type { UIMessage } from "@ai-sdk/react";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  return createAgentUIStreamResponse({ agent: supportAgent, uiMessages: messages });
}
