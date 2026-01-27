// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { ResetPassFormSchemaEn, ResetPassFormSchemaPl } from "@/features/auth/schemas/resetPassForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { ResetPassFormActionResult } from "@/features/auth/actions/resetPassForm";

// constants
const DEFAULT_VALUES: typeof ResetPassFormSchemaEn.Type = { newPassword: "", confirmPassword: "" };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: ResetPassFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_EN = createServerValidateWithTransforms(DEFAULT_VALUES, ResetPassFormSchemaEn);
export const SERVER_VALIDATE_PL = createServerValidateWithTransforms(DEFAULT_VALUES, ResetPassFormSchemaPl);
