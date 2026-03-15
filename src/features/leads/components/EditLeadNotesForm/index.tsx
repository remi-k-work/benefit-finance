/* eslint-disable react/no-children-prop */

"use client";

// react
import { startTransition, useActionState } from "react";

// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// services, features, and other libraries
import { Effect, Schema } from "effect";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcLeadsClient } from "@/features/leads/rpc/client";
import { initialFormState, mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { EditLeadNotesFormSchemaEn, EditLeadNotesFormSchemaPl } from "@/features/leads/schemas";
import { useEditLeadNotesFormFeedback } from "@/features/leads/hooks/feedbacks";
import { useInstanceContext } from "@/features/leads/components/AvailableLeadsTable/context";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// types
interface EditLeadNotesFormProps {
  allAvailableLeads: AllAvailableLeads;
  rowIndex: number;
}

// constants
import { FORM_OPTIONS_E, INITIAL_FORM_STATE_E } from "@/features/leads/constants";

const main = (leadId: string, formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { editLeadNotesForm } = yield* RpcLeadsClient;

    const result = yield* editLeadNotesForm({ leadId, formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function EditLeadNotesForm({ allAvailableLeads: { id: leadId, internalNotes }, rowIndex }: EditLeadNotesFormProps) {
  // Access the table context and retrieve all necessary information
  const {
    preferredLanguage,
    ll,
    llFormToastFeedback,
    table: { options },
  } = useInstanceContext();

  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(leadId, formDataToRecord(formData))),
    INITIAL_FORM_STATE_E,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset } = useAppForm({
    ...FORM_OPTIONS_E,
    defaultValues: { ...FORM_OPTIONS_E.defaultValues, internalNotes: internalNotes ?? "" },
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
  useEditLeadNotesFormFeedback(formState, reset, ll, llFormToastFeedback);

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
