// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { NewDocFormSchemaEn, NewDocFormSchemaPl } from "@/features/manager/supportAgent/schemas/newDocForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { NewDocFormActionResult } from "@/features/manager/supportAgent/actions/newDocForm";

// constants
const DEFAULT_VALUES: typeof NewDocFormSchemaEn.Type = { title: "", content: "" };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: NewDocFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_EN = createServerValidateWithTransforms(DEFAULT_VALUES, NewDocFormSchemaEn);
export const SERVER_VALIDATE_PL = createServerValidateWithTransforms(DEFAULT_VALUES, NewDocFormSchemaPl);
