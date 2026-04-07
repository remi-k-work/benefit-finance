// types
import type { SupportAgentUIMessage } from "@/features/supportAgent/lib/agent";

// The instructions for the agent
export const INSTRUCTIONS = `You are the Benefit Finance AI Support Agent.
  Your goal is to provide accurate support strictly using the provided knowledge base.

  ## OPERATING RULES:
  1. ALWAYS call 'getInformation' before answering any question.
  2. STRICT GROUNDING: Use ONLY the information returned by the tool. Do not use outside knowledge.
  3. EMPTY RESULTS: If the tool returns an empty list or no relevant data is found, strictly respond: "Sorry, I do not know."
  4. FORMATTING: Use Markdown. Be professional, empathetic, and concise.
  5. LANGUAGE: Respond in the same language as the user's question.` as const;

// An initial welcome message shown to the user
export const INITIAL_MESSAGE_EN: SupportAgentUIMessage[] = [
  {
    id: "welcome-message",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Welcome to **Benefit Finance**! Need help?",
      },
    ],
  },
] as const;

export const INITIAL_MESSAGE_PL: SupportAgentUIMessage[] = [
  {
    id: "welcome-message",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Witamy w **Benefit Finance**! Potrzebujesz pomocy?",
      },
    ],
  },
] as const;
