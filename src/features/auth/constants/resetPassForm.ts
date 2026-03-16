// services, features, and other libraries
import { Effect } from "effect";
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { ResetPassFormSchemaEn, ResetPassFormSchemaPl } from "@/features/auth/schemas";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";
import { ValidationHasFailedError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

// constants
const DEFAULT_VALUES: typeof ResetPassFormSchemaEn.Type = { newPassword: "", confirmPassword: "" };

export const FORM_OPTIONS_RP = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE_RP: ActionResultWithFormState = { ...initialFormState, actionStatus: "idle" };

export const SERVER_VALIDATE_EN_RP = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, ResetPassFormSchemaEn)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
export const SERVER_VALIDATE_PL_RP = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, ResetPassFormSchemaPl)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
