/* eslint-disable @typescript-eslint/no-explicit-any */

// services, features, and other libraries
import { Console, Effect, Either, Schema } from "effect";
import { createServerValidate } from "@tanstack/react-form-nextjs";
import { RuntimeClient } from "@/lib/RuntimeClient";
import { initialFormState, ServerValidateError } from "@tanstack/react-form-nextjs";

// types
import type { FormAsyncValidateOrFn } from "@tanstack/react-form-nextjs";
import type { ActionResultWithFormState } from "./helpersEffect";

// A custom wrapper for createServerValidate that applies schema transformations
export const createServerValidateWithTransforms = <A, I>(DEFAULT_VALUES: A, schema: Schema.Schema<A, I>) => {
  const SERVER_VALIDATE = createServerValidate({
    defaultValues: DEFAULT_VALUES,
    onServerValidate: Schema.standardSchemaV1(schema) as FormAsyncValidateOrFn<A>,
  });

  return async (formData: FormData): Promise<A> => {
    // Validate the form on the server side (it will throw if validation fails)
    const rawValidatedData = await SERVER_VALIDATE(formData);

    // Validation has passed, return the decoded form data (ensures that schema transformations are applied)
    return Schema.decodeUnknownSync(schema)(rawValidatedData);
  };
};

// Convert the FormData to a plain object before sending it to the RPC client (over the wire)
export const formDataToRecord = (formData: FormData): Record<string, string> => {
  const record: Record<string, string> = {};
  for (const [key, value] of formData.entries()) if (typeof value === "string") record[key] = value;
  return record;
};

// Recreate the FormData object from the RPC payload
export const recordToFormData = (formDataRecord: Record<string, string>): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(formDataRecord)) formData.append(key, value);
  return formData;
};

// Execute the main effect for the rpc action, handle known errors, and return the payload
export const runRpcActionMain = async <A extends ActionResultWithFormState, E extends { _tag: string; readonly cause?: unknown }>(
  serverActionMain: Effect.Effect<A, E, any>,
): Promise<ActionResultWithFormState> => {
  // We wrap in Effect.either to catch failures gracefully
  const rpcActionMainResult = await RuntimeClient.runPromise(
    serverActionMain.pipe(
      Effect.tapError((error) => Console.log(`[RPC ACTION MAIN ERROR]: ${error}`)),
      Effect.either,
    ),
  );

  // Standardized error handling
  if (Either.isLeft(rpcActionMainResult)) {
    const error = rpcActionMainResult.left;

    // Return early if the current user is in demo mode or not an admin
    if (error._tag === "UnauthorizedAccessError") return { ...initialFormState, actionStatus: "demoMode", timestamp: Date.now() };

    // Validation has failed
    if (error._tag === "ValidationHasFailedError") {
      if (error.cause instanceof ServerValidateError) return { ...error.cause.formState, actionStatus: "invalid", timestamp: Date.now() };
    }

    // Some other error occurred
    return { ...initialFormState, actionStatus: "failed", timestamp: Date.now() };
  } else {
    // The form has successfully validated and submitted!
    return rpcActionMainResult.right;
  }
};
