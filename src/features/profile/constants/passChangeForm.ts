// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { PassChangeFormSchemaEn, PassChangeFormSchemaPl, PassSetupFormSchemaEn, PassSetupFormSchemaPl } from "@/features/profile/schemas/passChangeForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { PassChangeFormActionResult } from "@/features/profile/actions/passChangeForm";

// constants
const DEFAULT_VALUES_CHANGE: typeof PassChangeFormSchemaEn.Type = { currentPassword: "", newPassword: "", confirmPassword: "" };
const DEFAULT_VALUES_SETUP: typeof PassSetupFormSchemaEn.Type = { newPassword: "", confirmPassword: "" };

export const FORM_OPTIONS_CHANGE = formOptions({ defaultValues: DEFAULT_VALUES_CHANGE });
export const FORM_OPTIONS_SETUP = formOptions({ defaultValues: DEFAULT_VALUES_SETUP });
export const INITIAL_FORM_STATE: PassChangeFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_CHANGE_EN = createServerValidateWithTransforms(DEFAULT_VALUES_CHANGE, PassChangeFormSchemaEn);
export const SERVER_VALIDATE_CHANGE_PL = createServerValidateWithTransforms(DEFAULT_VALUES_CHANGE, PassChangeFormSchemaPl);
export const SERVER_VALIDATE_SETUP_EN = createServerValidateWithTransforms(DEFAULT_VALUES_SETUP, PassSetupFormSchemaEn);
export const SERVER_VALIDATE_SETUP_PL = createServerValidateWithTransforms(DEFAULT_VALUES_SETUP, PassSetupFormSchemaPl);
