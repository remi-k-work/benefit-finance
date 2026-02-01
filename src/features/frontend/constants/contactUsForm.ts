// services, features, and other libraries
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { ContactUsFormSchemaEn, ContactUsFormSchemaPl } from "@/features/frontend/schemas/contactUsForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";

// types
import type { ContactUsFormActionResult } from "@/features/frontend/actions/contactUsForm";

// constants
const DEFAULT_VALUES: typeof ContactUsFormSchemaEn.Type = { name: "", email: "", subject: "", phone: "", message: "", captcha: "" };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: ContactUsFormActionResult = { ...initialFormState, actionStatus: "idle" };
export const SERVER_VALIDATE_EN = createServerValidateWithTransforms(DEFAULT_VALUES, ContactUsFormSchemaEn);
export const SERVER_VALIDATE_PL = createServerValidateWithTransforms(DEFAULT_VALUES, ContactUsFormSchemaPl);
