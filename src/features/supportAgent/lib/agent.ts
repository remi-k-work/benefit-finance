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

const MODEL_TIMEOUT = "15 seconds";
const RETRY_SCHEDULE = Schedule.intersect(Schedule.exponential("500 millis"), Schedule.recurs(2)).pipe(Schedule.jittered);

const MODEL_CANDIDATES = [
  { name: "gemini-3-flash-preview", model: google("gemini-3-flash-preview") },
  { name: "gemini-flash-latest", model: google("gemini-flash-latest") },
  { name: "gemini-flash-lite-latest", model: google("gemini-flash-lite-latest") },
] as const;

// This is a factory designed to create a support agent that uses a specified model
const supportAgent = (model: LanguageModel) =>
  new ToolLoopAgent({
    model,
    instructions: INSTRUCTIONS,

    stopWhen: stepCountIs(5),
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

// Hybrid Error Classifier: Checks standard HTTP status codes, falling back to string matching
const isRetryableModelFailure = (cause: unknown) => {
  // If Vercel AI SDK passed through an HTTP status code natively
  if (cause instanceof Error && "statusCode" in cause) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const status = (cause as any).statusCode;
    if ([408, 429, 500, 502, 503, 504].includes(status)) return true;
  }

  // Broad fallback for nested errors, native fetch errors, and our custom timeouts
  const message = JSON.stringify(cause).toLowerCase();
  return ["timeout", "timed out", "429", "rate limit", "network", "econnreset", "temporarily unavailable", "service unavailable"].some((fragment) =>
    message.includes(fragment),
  );
};

// The resilience policy ensures the support agent operates using multiple models in a fallback chain (model1 -> model2 -> model3 -> model4 -> model5)
const supportAgentPolicy = (prompt: string | ModelMessage[]) =>
  Effect.gen(function* () {
    const attempts = MODEL_CANDIDATES.map(({ name, model }) =>
      runAgentWithModel(model, prompt).pipe(
        // Enforce a strict time limit on this specific attempt
        Effect.timeoutFail({ duration: MODEL_TIMEOUT, onTimeout: () => new AiSdkError({ message: `Model '${name}' timed out after ${MODEL_TIMEOUT}` }) }),
        // Retry only if the classifier deems the failure transient
        Effect.retry({ schedule: RETRY_SCHEDULE, while: isRetryableModelFailure }),
        // Log a warning if the model completely fails all retries before moving to the next candidate
        Effect.tapError((cause) =>
          Effect.logWarning(
            `[SUPPORT AGENT] Model '${name}' failed. Moving to fallback. Cause: ${cause instanceof Error ? cause.message : JSON.stringify(cause)}`,
          ),
        ),
      ),
    );

    // Run through the mapped attempts array in order
    return yield* Effect.firstSuccessOf(attempts);
  });

// Run the support agent using a fallback chain of models
export const runSupportAgent = (prompt: string | ModelMessage[]) => supportAgentPolicy(prompt);
