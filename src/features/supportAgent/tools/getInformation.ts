// drizzle and db access
import { getInformation } from "@/features/supportAgent/db";

// services, features, and other libraries
import { tool } from "ai";
import { InputSchema, OutputSchema } from "@/features/supportAgent/schemas/getInformation";
import { RuntimeServer } from "@/lib/RuntimeServer";

export const getInformationTool = tool({
  description: "Get information from your knowledge base to answer questions.",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  execute: async ({ question }) => {
    // Search the agent's knowledge base for document chunks that are most relevant to the user's question
    return await RuntimeServer.runPromise(getInformation(question));
  },
});
