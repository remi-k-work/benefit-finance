// node.js
import { inspect } from "node:util";

// services, features, and other libraries
import { Effect } from "effect";
import { stepCountIs, ToolLoopAgent } from "ai";
import { google } from "@ai-sdk/google";
import { getInformationTool } from "@/features/supportAgent/tools/getInformation";
import { AiSdkError } from "@/lib/errors";

// constants
import { INSTRUCTIONS } from "@/features/supportAgent/constants";

const supportAgent = new ToolLoopAgent({
  model: google("gemini-flash-lite-latest"),
  instructions: INSTRUCTIONS,

  stopWhen: stepCountIs(3),
  tools: {
    getInformation: getInformationTool,
  },
});

export const runSupportAgent = (question: string) =>
  Effect.tryPromise({
    try: () =>
      supportAgent.stream({
        prompt: question,

        // Give us some feedback on each step for debugging
        onStepFinish: async ({ usage, finishReason, toolCalls, toolResults }) => {
          console.log(
            "Step completed:",
            inspect(
              {
                tokens: {
                  in: usage.inputTokens,
                  out: usage.outputTokens,
                },
                finishReason,
                toolCalls: toolCalls?.map(({ toolName, input }) => ({
                  toolName,
                  input,
                })),
                toolResults: toolResults?.map(({ toolName, input, output }) => ({
                  toolName,
                  input,
                  output,
                })),
              },
              { depth: null, colors: true },
            ),
          );
        },
      }),
    catch: (cause) => new AiSdkError({ message: "Failed to run support agent", cause }),
  });
