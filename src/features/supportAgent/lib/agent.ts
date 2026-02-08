// node.js
import { inspect } from "node:util";

// services, features, and other libraries
import { Effect, pipe, Schedule } from "effect";
import { InferAgentUIMessage, stepCountIs, ToolLoopAgent } from "ai";
import { google } from "@ai-sdk/google";
import { getInformationTool } from "@/features/supportAgent/tools/getInformation";
import { AiSdkError } from "@/lib/errors";

// types
import type { LanguageModel, ModelMessage } from "ai";
export type SupportAgentUIMessage = InferAgentUIMessage<typeof supportAgent>;

// constants
import { INSTRUCTIONS } from "@/features/supportAgent/constants";

export const supportAgent = (model: LanguageModel) =>
  new ToolLoopAgent({
    model,
    instructions: INSTRUCTIONS,

    stopWhen: stepCountIs(3),
    tools: {
      getInformation: getInformationTool,
    },

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
  });

const runAgent = (model: LanguageModel) => (prompt: string) => supportAgent(model).stream({ prompt });

export const runSupportAgent = (prompt: string | ModelMessage[]) =>
  Effect.tryPromise({
    try: () =>
      supportAgent(google("gemini-flash-latest")).stream({
        prompt,
      }),
    catch: (cause) => new AiSdkError({ message: "Failed to run support agent", cause }),
  }).pipe(
    Effect.retry(Schedule.exponential("200 millis").pipe(Schedule.intersect(Schedule.recurs(2)))),
    Effect.tapError((error) => Effect.logError("Primary model failed, switching...", error)),
  );
