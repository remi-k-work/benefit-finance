// services, features, and other libraries
import { Effect } from "effect";
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { SignInFormSchemaEn, SignInFormSchemaPl } from "@/features/auth/schemas";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";
import { ValidationHasFailedError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

// constants
const DEFAULT_VALUES: typeof SignInFormSchemaEn.Type = { email: "", password: "", rememberMe: false };

export const FORM_OPTIONS_SI = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE_SI: ActionResultWithFormState = { ...initialFormState, actionStatus: "idle" };

export const SERVER_VALIDATE_EN_SI = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, SignInFormSchemaEn)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
export const SERVER_VALIDATE_PL_SI = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, SignInFormSchemaPl)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
