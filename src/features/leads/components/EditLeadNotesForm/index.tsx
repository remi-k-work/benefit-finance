"use client";

// react
import { useMemo } from "react";

// drizzle and db access
import type { AllAvailableLeads } from "@/features/leads/db";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcLeadsClient } from "@/features/leads/rpc/client";
import { editLeadNotesFormBuilder } from "@/features/leads/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";
import { useInstanceContext } from "@/features/leads/components/AvailableLeadsTable/context";

// components
import { TextAreaInput } from "@/components/Form2/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form2";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type { Table } from "@tanstack/react-table";

interface EditLeadNotesFormProps {
  allAvailableLeads: AllAvailableLeads;
  rowIndex: number;
}

const editLeadNotesForm = (leadId: string, preferredLanguage: Lang) =>
  FormReact.make(editLeadNotesFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: {
      internalNotes: TextAreaInput,
    },
    onSubmit: (args: { table: Table<AllAvailableLeads>; rowIndex: number }, { decoded: { internalNotes } }) =>
      Effect.gen(function* () {
        const { editLeadNotesForm } = yield* RpcLeadsClient;
        yield* editLeadNotesForm({ leadId, internalNotes });

        // Only reflect changes in the UI if the action was successful
        const {
          table: { options },
          rowIndex,
        } = args;
        yield* Effect.sync(() => {
          options.meta?.updateData(rowIndex, "internalNotes", internalNotes);
          options.meta?.updateData(rowIndex, "updatedAt", new Date());
        });
      }),
  });

export default function EditLeadNotesForm({ allAvailableLeads: { id: leadId, internalNotes }, rowIndex }: EditLeadNotesFormProps) {
  // Access the table context and retrieve all necessary information
  const { preferredLanguage, ll, llFormToastFeedback, table } = useInstanceContext();

  // Get the form context
  const editLeadNotesFormL = useMemo(() => editLeadNotesForm(leadId, preferredLanguage), [leadId, preferredLanguage]);
  const submit = useAtomSet(editLeadNotesFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    editLeadNotesFormL.submit,
    llFormToastFeedback,
    ll["[EDIT LEAD NOTES]"],
    ll["The lead notes have been updated."],
    ll["The lead notes could not be updated; please try again later."],
  );

  return (
    <editLeadNotesFormL.Initialize defaultValues={{ internalNotes: internalNotes ?? "" }}>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          submit({ table, rowIndex });
        }}
      >
        <editLeadNotesFormL.internalNotes
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
        <br />
        <SubmitStatus
          form={editLeadNotesFormL}
          ll={llFormToastFeedback}
          formName={ll["[EDIT LEAD NOTES]"]}
          succeededDesc={ll["The lead notes have been updated."]}
          failedDesc={ll["The lead notes could not be updated; please try again later."]}
        />
        <FormSubmit
          form={editLeadNotesFormL}
          submitIcon={<PencilSquareIcon className="size-9" />}
          submitText={ll["Update Internal Notes"]}
          resetText={ll["Clear Form"]}
          showCancel={false}
        />
      </form>
    </editLeadNotesFormL.Initialize>
  );
}
