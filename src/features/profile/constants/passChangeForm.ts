// services, features, and other libraries
import { Effect } from "effect";
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { PassChangeFormSchemaEn, PassChangeFormSchemaPl, PassSetupFormSchemaEn, PassSetupFormSchemaPl } from "@/features/profile/schemas";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";
import { ValidationHasFailedError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

// constants
const DEFAULT_VALUES_CHANGE: typeof PassChangeFormSchemaEn.Type = { currentPassword: "", newPassword: "", confirmPassword: "" };
const DEFAULT_VALUES_SETUP: typeof PassSetupFormSchemaEn.Type = { newPassword: "", confirmPassword: "" };

export const FORM_OPTIONS_CHANGE_PC = formOptions({ defaultValues: DEFAULT_VALUES_CHANGE });
export const FORM_OPTIONS_SETUP_PC = formOptions({ defaultValues: DEFAULT_VALUES_SETUP });
export const INITIAL_FORM_STATE_PC: ActionResultWithFormState = { ...initialFormState, actionStatus: "idle" };

export const SERVER_VALIDATE_CHANGE_EN_PC = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES_CHANGE, PassChangeFormSchemaEn)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
export const SERVER_VALIDATE_CHANGE_PL_PC = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES_CHANGE, PassChangeFormSchemaPl)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
export const SERVER_VALIDATE_SETUP_EN_PC = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES_SETUP, PassSetupFormSchemaEn)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
export const SERVER_VALIDATE_SETUP_PL_PC = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES_SETUP, PassSetupFormSchemaPl)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
