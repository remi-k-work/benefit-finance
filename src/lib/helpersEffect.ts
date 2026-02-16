/* eslint-disable @typescript-eslint/no-explicit-any */

// next
import { connection } from "next/server";
import { notFound, unauthorized } from "next/navigation";
// import { revalidatePath } from "next/cache";

// services, features, and other libraries
import { Console, Effect, Either, Schema } from "effect";
import { RuntimeServer } from "@/lib/RuntimeServer";
import { initialFormState, ServerValidateError } from "@tanstack/react-form-nextjs";
import { InvalidPageInputsError } from "./errors";

// types
import type { ServerFormState } from "@tanstack/react-form-nextjs";

export interface ActionResultWithFormState extends ServerFormState<any, any> {
  actionStatus: "idle" | "succeeded" | "failed" | "invalid" | "demoMode";
}

interface PageInputPromises {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

// Safely validate next.js route inputs (`params` and `searchParams`) against a schema; return typed data or trigger a 404 on failure
export const validatePageInputs = <A, I>(schema: Schema.Schema<A, I>, { params, searchParams }: PageInputPromises) =>
  Effect.gen(function* () {
    const [p, sp] = yield* Effect.all([Effect.promise(() => params), Effect.promise(() => searchParams)], { concurrency: 2 });
    return yield* Schema.decodeUnknown(schema)({ params: p, searchParams: sp }).pipe(
      Effect.mapError((cause) => new InvalidPageInputsError({ message: "Invalid page inputs", cause })),
    );
  });

// Execute the main effect for the page, map known errors to the subsequent navigation helpers, and return the payload
export const runPageMainOrNavigate = async <A, E extends { _tag: string }>(pageMain: Effect.Effect<A, E, any>) => {
  // Explicitly defer to request time (Effect uses Date.now() internally)
  await connection();

  // We wrap in Effect.either to catch failures gracefully
  const pageMainResult = await RuntimeServer.runPromise(
    pageMain.pipe(
      Effect.tapError((error) => Console.log(`[PAGE MAIN ERROR]: ${error}`)),
      Effect.either,
    ),
  );

  // Standardized error handling
  if (Either.isLeft(pageMainResult)) {
    const error = pageMainResult.left;

    if (error._tag === "InvalidPageInputsError") notFound();
    if (error._tag === "ItemNotFoundError") notFound();
    if (error._tag === "UnauthorizedAccessError") unauthorized();

    // Allow the next.js error boundary to catch any unexpected errors
    throw error;
  } else {
    // Return success result
    return pageMainResult.right;
  }
};

// Execute the main effect for the component, handle known errors, and return the payload
export const runComponentMain = async <A, E extends { _tag: string }>(componentMain: Effect.Effect<A, E, any>) => {
  // Explicitly defer to request time (Effect uses Date.now() internally)
  await connection();

  // We wrap in Effect.either to catch failures gracefully
  const componentMainResult = await RuntimeServer.runPromise(
    componentMain.pipe(
      Effect.tapError((error) => Console.log(`[COMPONENT MAIN ERROR]: ${error}`)),
      Effect.either,
    ),
  );

  // Standardized error handling
  if (Either.isLeft(componentMainResult)) {
    const error = componentMainResult.left;

    // Allow the next.js error boundary to catch any unexpected errors
    throw error;
  } else {
    // Return success result
    return componentMainResult.right;
  }
};

// Execute the main effect for the server action, handle known errors, and return the payload
export const runServerActionMain = async <A extends ActionResultWithFormState, E extends { _tag: string; readonly cause?: unknown }>(
  serverActionMain: Effect.Effect<A, E, any>,
): Promise<ActionResultWithFormState> => {
  // We wrap in Effect.either to catch failures gracefully
  const serverActionMainResult = await RuntimeServer.runPromise(
    serverActionMain.pipe(
      Effect.tapError((error) => Console.log(`[SERVER ACTION MAIN ERROR]: ${error}`)),
      Effect.either,
    ),
  );

  // Standardized error handling
  if (Either.isLeft(serverActionMainResult)) {
    const error = serverActionMainResult.left;

    if (error._tag === "UnauthorizedAccessError") unauthorized();

    // Return early if the current user is in demo mode or not an admin
    if (error._tag === "DemoModeError") return { ...initialFormState, actionStatus: "demoMode" };

    // Validation has failed
    if (error._tag === "ValidationHasFailedError") {
      if (error.cause instanceof ServerValidateError) return { ...error.cause.formState, actionStatus: "invalid" };
    }

    // Some other error occurred
    return { ...initialFormState, actionStatus: "failed" };
  } else {
    // Revalidate, so the fresh data will be fetched from the server next time this path is visited
    // revalidatePath("/", "layout");

    // The form has successfully validated and submitted!
    return serverActionMainResult.right;
  }
};
