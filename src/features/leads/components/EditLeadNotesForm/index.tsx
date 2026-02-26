/* eslint-disable react/no-children-prop */

"use client";

// react
import { startTransition, useActionState } from "react";

// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// server actions and mutations
import editLeadNotesForm from "@/features/leads/actions/editLeadNotesForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { EditLeadNotesFormSchemaEn, EditLeadNotesFormSchemaPl } from "@/features/leads/schemas/editLeadNotesForm";
import useEditLeadNotesFormFeedback from "@/features/leads/hooks/feedbacks/useEditLeadNotesForm";
import { useInstanceContext } from "@/features/leads/components/AvailableLeadsTable/context";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// types
interface EditLeadNotesFormProps {
  allAvailableLeads: AllAvailableLeads;
  rowIndex: number;
}

// constants
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/leads/constants/editLeadNotesForm";

export default function EditLeadNotesForm({ allAvailableLeads: { id: leadId, internalNotes }, rowIndex }: EditLeadNotesFormProps) {
  // Access the table context and retrieve all necessary information
  const {
    preferredLanguage,
    ll,
    llFormToastFeedback,
    table: { options },
  } = useInstanceContext();

  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(editLeadNotesForm.bind(null, leadId), INITIAL_FORM_STATE);
  const { AppField, AppForm, FormSubmit, handleSubmit } = useAppForm({
    ...FORM_OPTIONS,
    defaultValues: { ...FORM_OPTIONS.defaultValues, internalNotes: internalNotes ?? "" },
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
    onSubmit: async ({ value: { internalNotes } }) => {
      // Only reflect changes in the UI if the action was successful
      startTransition(() => {
        options.meta?.updateData(rowIndex, "internalNotes", internalNotes.trim());
        options.meta?.updateData(rowIndex, "updatedAt", new Date());
      });
    },
  });

  // Provide feedback to the user regarding this form actions
  useEditLeadNotesFormFeedback(formState, ll, llFormToastFeedback);

  return (
    <AppForm>
      <form
        action={formAction}
        onSubmit={async () => {
          await handleSubmit();
        }}
      >
        <AppField
          name="internalNotes"
          validators={{
            onChange: Schema.standardSchemaV1(
              preferredLanguage === "en" ? EditLeadNotesFormSchemaEn.fields.internalNotes : EditLeadNotesFormSchemaPl.fields.internalNotes,
            ),
          }}
          children={(field) => (
            <field.TextAreaField
              label={ll["Internal Notes"]}
              cols={50}
              rows={8}
              maxLength={2049}
              spellCheck={false}
              autoComplete="off"
              placeholder={
                ll[
                  "e.g., Spoke with client. Interested in subsidies related to home renovation. Requested more details via email. Sent initial documentation and checklist. Waiting for response."
                ]
              }
            />
          )}
        />
        <FormSubmit
          submitIcon={<PencilSquareIcon className="size-9" />}
          submitText={ll["Update Internal Notes"]}
          resetText={ll["Clear Form"]}
          isPending={isPending}
          showCancel={false}
        />
      </form>
    </AppForm>
  );
}
