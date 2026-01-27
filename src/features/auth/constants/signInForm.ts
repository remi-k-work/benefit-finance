// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { SignInFormSchemaEn, SignInFormSchemaPl } from "@/features/auth/schemas/signInForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { SignInFormActionResult } from "@/features/auth/actions/signInForm";

// constants
const DEFAULT_VALUES: typeof SignInFormSchemaEn.Type = { email: "", password: "", rememberMe: false };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: SignInFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_EN = createServerValidateWithTransforms(DEFAULT_VALUES, SignInFormSchemaEn);
export const SERVER_VALIDATE_PL = createServerValidateWithTransforms(DEFAULT_VALUES, SignInFormSchemaPl);
