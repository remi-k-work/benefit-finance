// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { SignUpFormSchemaEn, SignUpFormSchemaPl } from "@/features/auth/schemas/signUpForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { SignUpFormActionResult } from "@/features/auth/actions/signUpForm";

// constants
const DEFAULT_VALUES: typeof SignUpFormSchemaEn.Type = { name: "", email: "", password: "", confirmPassword: "" };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: SignUpFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_EN = createServerValidateWithTransforms(DEFAULT_VALUES, SignUpFormSchemaEn);
export const SERVER_VALIDATE_PL = createServerValidateWithTransforms(DEFAULT_VALUES, SignUpFormSchemaPl);
