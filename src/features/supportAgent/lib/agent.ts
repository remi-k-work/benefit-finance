// node.js
import { inspect } from "node:util";

// services, features, and other libraries
import { Effect, Schedule, Sink, Stream } from "effect";
import { InferAgentUIMessage, stepCountIs, ToolLoopAgent } from "ai";
import { google } from "@ai-sdk/google";
import { getInformationTool } from "@/features/supportAgent/tools/getInformation";
import { AiSdkError } from "@/lib/errors";

// types
import type { LanguageModel, ModelMessage } from "ai";
export type SupportAgentUIMessage = InferAgentUIMessage<typeof supportAgent>;

// constants
import { INSTRUCTIONS } from "@/features/supportAgent/constants";

// This is a factory designed to create a support agent that uses a specified model
const supportAgent = (model: LanguageModel) =>
  new ToolLoopAgent({
    model,
    instructions: INSTRUCTIONS,

    stopWhen: stepCountIs(3),
    maxRetries: 0,

    tools: {
      getInformation: getInformationTool,
    },

    prepareStep: async ({ messages }) => {
      // Only retain recent messages to remain within context limits (system instructions + the last 10 messages)
      if (messages.length > 20) return { messages: [messages[0], ...messages.slice(-10)] };
      return {};
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

// Initialize the support agent stream
const initAgentStream = (model: LanguageModel, prompt: string | ModelMessage[]) =>
  Effect.tryPromise({
    try: () => supportAgent(model).stream({ prompt }),
    catch: (cause) => new AiSdkError({ message: "Failed to init support agent stream", cause }),
  });

// Run the support agent using a specified model and prompt, and start streaming its responses
const runAgentWithModel = (model: LanguageModel, prompt: string | ModelMessage[]) =>
  Effect.gen(function* () {
    // Initialize the support agent stream
    const result = yield* initAgentStream(model, prompt);

    // Convert to response immediately so we can check the underlying stream
    const response = result.toUIMessageStreamResponse();

    // Peek at the stream to force any immediate network errors (like 429s)
    const stream = Stream.fromAsyncIterable(result.textStream, (cause) => new AiSdkError({ message: "Stream read failed", cause }));
    yield* Stream.run(stream, Sink.head());

    return { result, response };
  });

// The resilience policy ensures the support agent operates using multiple models in a fallback chain (model1 -> model2 -> model3 -> model4 -> model5)
const supportAgentPolicy = (prompt: string | ModelMessage[]) =>
  Effect.gen(function* () {
    const schedule = Schedule.intersect(Schedule.exponential("200 millis"), Schedule.recurs(3));

    const model1 = runAgentWithModel(google("gemini-3-flash-preview"), prompt).pipe(
      Effect.retry(schedule),
      Effect.timeout("6 seconds"),
      Effect.tapError(() => Effect.logWarning("Model1 'gemini-3-flash-preview' failed, switching...")),
    );
    const model2 = runAgentWithModel(google("gemini-flash-latest"), prompt).pipe(
      Effect.retry(schedule),
      Effect.timeout("6 seconds"),
      Effect.tapError(() => Effect.logWarning("Model2 'gemini-flash-latest' failed, switching...")),
    );
    const model3 = runAgentWithModel(google("gemini-flash-lite-latest"), prompt).pipe(
      Effect.retry(schedule),
      Effect.timeout("6 seconds"),
      Effect.tapError(() => Effect.logWarning("Model3 'gemini-flash-lite-latest' failed, switching...")),
    );
    const model4 = runAgentWithModel(google("gemini-2.0-flash"), prompt).pipe(
      Effect.retry(schedule),
      Effect.timeout("6 seconds"),
      Effect.tapError(() => Effect.logWarning("Model4 'gemini-2.0-flash' failed, switching...")),
    );
    const model5 = runAgentWithModel(google("gemini-2.0-flash-lite"), prompt).pipe(
      Effect.retry(schedule),
      Effect.timeout("6 seconds"),
      Effect.tapError(() => Effect.logWarning("Model5 'gemini-2.0-flash-lite' failed, switching...")),
    );

    // Use the first model that succeeds and start streaming its responses
    return yield* Effect.firstSuccessOf([model1, model2, model3, model4, model5]);
  });

// Run the support agent using a fallback chain of models
export const runSupportAgent = (prompt: string | ModelMessage[]) => supportAgentPolicy(prompt);
