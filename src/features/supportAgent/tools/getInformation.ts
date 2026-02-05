// drizzle and db access
import { searchDocChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { tool } from "ai";
import { InputSchema, OutputSchema } from "@/features/supportAgent/schemas/searchDocChunks";
import { RuntimeServer } from "@/lib/RuntimeServer";

export const getInformationTool = tool({
  description: "Get information from your knowledge base to answer questions.",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  execute: async ({ question }) => {
    // Search for and retrieve support agent document chunks most relevant to the user's question
    return { output: await RuntimeServer.runPromise(searchDocChunks(question)) };
  },
});
