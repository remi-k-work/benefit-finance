// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { ForgotPassFormSchemaEn, ForgotPassFormSchemaPl } from "@/features/auth/schemas/forgotPassForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { ForgotPassFormActionResult } from "@/features/auth/actions/forgotPassForm";

// constants
const DEFAULT_VALUES: typeof ForgotPassFormSchemaEn.Type = { email: "" };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: ForgotPassFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_EN = createServerValidateWithTransforms(DEFAULT_VALUES, ForgotPassFormSchemaEn);
export const SERVER_VALIDATE_PL = createServerValidateWithTransforms(DEFAULT_VALUES, ForgotPassFormSchemaPl);
