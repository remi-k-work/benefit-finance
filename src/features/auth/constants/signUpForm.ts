// services, features, and other libraries
import { Effect } from "effect";
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { SignUpFormSchemaEn, SignUpFormSchemaPl } from "@/features/auth/schemas";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";
import { ValidationHasFailedError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

// constants
const DEFAULT_VALUES: typeof SignUpFormSchemaEn.Type = { name: "", email: "", password: "", confirmPassword: "" };

export const FORM_OPTIONS_SU = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE_SU: ActionResultWithFormState = { ...initialFormState, actionStatus: "idle" };

export const SERVER_VALIDATE_EN_SU = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, SignUpFormSchemaEn)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
export const SERVER_VALIDATE_PL_SU = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, SignUpFormSchemaPl)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
