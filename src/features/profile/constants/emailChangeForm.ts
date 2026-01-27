// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { EmailChangeFormSchemaEn, EmailChangeFormSchemaPl } from "@/features/profile/schemas/emailChangeForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { EmailChangeFormActionResult } from "@/features/profile/actions/emailChangeForm";

// constants
const DEFAULT_VALUES: typeof EmailChangeFormSchemaEn.Type = { newEmail: "" };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: EmailChangeFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_EN = createServerValidateWithTransforms(DEFAULT_VALUES, EmailChangeFormSchemaEn);
export const SERVER_VALIDATE_PL = createServerValidateWithTransforms(DEFAULT_VALUES, EmailChangeFormSchemaPl);
