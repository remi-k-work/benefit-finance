// services, features, and other libraries
import { stepCountIs, ToolLoopAgent } from "ai";
import { google } from "@ai-sdk/google";
import { getInformationTool } from "@/features/supportAgent/tools/getInformation";

export const supportAgent = new ToolLoopAgent({
  model: google("gemini-flash-latest"),
  instructions:
    `You are a helpful assistant. Check your knowledge base before answering any questions. Only respond to questions using information from tool calls. If no relevant information is found in the tool calls, respond, "Sorry, I do not know." Always respond in markdown.` as const,

  stopWhen: stepCountIs(5),
  tools: {
    getInformation: getInformationTool,
  },
});
