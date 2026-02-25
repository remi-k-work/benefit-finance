// services, features, and other libraries
import { Effect } from "effect";
import { formOptions, initialFormState } from "@tanstack/react-form-nextjs";
import { EditLeadNotesFormSchemaEn, EditLeadNotesFormSchemaPl } from "@/features/leads/schemas/editLeadNotesForm";
import { createServerValidateWithTransforms } from "@/lib/helpersEffectClient";
import { ValidationHasFailedError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

// constants
const DEFAULT_VALUES: typeof EditLeadNotesFormSchemaEn.Type = { internalNotes: "" };

export const FORM_OPTIONS = formOptions({ defaultValues: DEFAULT_VALUES });
export const INITIAL_FORM_STATE: ActionResultWithFormState = { ...initialFormState, actionStatus: "idle" };

export const SERVER_VALIDATE_EN = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, EditLeadNotesFormSchemaEn)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
export const SERVER_VALIDATE_PL = (formData: FormData) =>
  Effect.tryPromise({
    try: () => createServerValidateWithTransforms(DEFAULT_VALUES, EditLeadNotesFormSchemaPl)(formData),
    catch: (cause) => new ValidationHasFailedError({ message: "Server validation failed", cause }),
  });
