// types
import type { UIMessage } from "@ai-sdk/react";

// The instructions for the agent
export const INSTRUCTIONS =
  `You are a helpful assistant. Check your knowledge base before answering any questions. Only respond to questions using information from tool calls. If no relevant information is found in the tool calls, respond, "Sorry, I do not know." Always respond in markdown.` as const;

// An initial welcome message shown to the user
export const INITIAL_MESSAGE = [
  {
    id: "welcome-message",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Welcome to Benefit Finance! How can I help you today?",
      },
    ],
  },
] as const satisfies UIMessage[];
