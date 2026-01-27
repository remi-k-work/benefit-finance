// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { ProfileDetailsFormSchemaEn, ProfileDetailsFormSchemaPl } from "@/features/profile/schemas/profileDetailsForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { ProfileDetailsFormActionResult } from "@/features/profile/actions/profileDetailsForm";

// constants
const DEFAULT_VALUES: typeof ProfileDetailsFormSchemaEn.Type = { name: "" };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: ProfileDetailsFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_EN = createServerValidateWithTransforms(DEFAULT_VALUES, ProfileDetailsFormSchemaEn);
export const SERVER_VALIDATE_PL = createServerValidateWithTransforms(DEFAULT_VALUES, ProfileDetailsFormSchemaPl);
