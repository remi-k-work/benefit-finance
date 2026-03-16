// services, features, and other libraries
import { Effect } from "effect";
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { ForgotPassFormSchemaEn, ForgotPassFormSchemaPl } from "@/features/auth/schemas";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";
import { ValidationHasFailedError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

// constants
const DEFAULT_VALUES: typeof ForgotPassFormSchemaEn.Type = { email: "" };

export const FORM_OPTIONS_FP = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE_FP: ActionResultWithFormState = { ...initialFormState, actionStatus: "idle" };

export const SERVER_VALIDATE_EN_FP = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, ForgotPassFormSchemaEn)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
export const SERVER_VALIDATE_PL_FP = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, ForgotPassFormSchemaPl)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
