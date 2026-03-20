/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useRef } from "react";

// drizzle and db access
import type { Doc } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect, Schema } from "effect";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcSupportAgentClient } from "@/features/supportAgent/rpc/client";
import { initialFormState, mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { EditDocFormSchemaEn, EditDocFormSchemaPl } from "@/features/supportAgent/schemas";
import { useEditDocFormFeedback } from "@/features/supportAgent/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";
import type { MDXEditorMethods } from "@mdxeditor/editor";

interface EditDocFormProps {
  doc: Doc;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.supportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS_E, INITIAL_FORM_STATE_E } from "@/features/supportAgent/constants";

const main = (docId: string, formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { editDocForm } = yield* RpcSupportAgentClient;

    const result = yield* editDocForm({ docId, formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function EditDocForm({ doc: { id: docId, title, content }, preferredLanguage, ll, llFormToastFeedback }: EditDocFormProps) {
  // Create a ref to the editor component
  const markdownFieldRef = useRef<MDXEditorMethods>(null);

  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(docId, formDataToRecord(formData))),
    INITIAL_FORM_STATE_E,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS_E,
    defaultValues: { ...FORM_OPTIONS_E.defaultValues, title, content, markdown: content },
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
    validators: { onMount: Schema.standardSchemaV1(preferredLanguage === "en" ? EditDocFormSchemaEn : EditDocFormSchemaPl) as any },
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useEditDocFormFeedback(
    formState,
    () => {
      reset();
      markdownFieldRef.current?.setMarkdown(content);
    },
    store,
    ll,
    llFormToastFeedback,
  );

  return (
    <AppForm>
      <form
        action={formAction}
        onSubmit={async () => {
          await handleSubmit();
        }}
      >
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>{ll["Edit Document"]}</CardTitle>
            <CardDescription>{ll["To edit an existing document for the support agent"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="title"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? EditDocFormSchemaEn.fields.title : EditDocFormSchemaPl.fields.title) as any,
              }}
              children={(field) => (
                <field.TextField label={ll["Title"]} size={40} maxLength={51} spellCheck autoComplete="off" placeholder={ll["e.g., About Benefit Finance"]} />
              )}
            />
            <AppField
              name="markdown"
              children={(field) => (
                <field.MarkdownField
                  ref={markdownFieldRef}
                  label={ll["Content"]}
                  markdown=""
                  spellCheck={false}
                  placeholder={
                    ll[
                      "e.g., Benefit Finance is a holistic wealth management company founded on the belief that financial freedom should be accessible to everyone."
                    ]
                  }
                  onChange={(markdown) => field.form.setFieldValue("content", markdown)}
                />
              )}
            />
            <AppField
              name="content"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? EditDocFormSchemaEn.fields.content : EditDocFormSchemaPl.fields.content) as any,
              }}
              children={(field) => (
                <field.TextAreaField
                  cols={50}
                  rows={8}
                  maxLength={2049}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder={
                    ll[
                      "e.g., Benefit Finance is a holistic wealth management company founded on the belief that financial freedom should be accessible to everyone."
                    ]
                  }
                  hidden
                />
              )}
            />
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<PencilSquareIcon className="size-9" />}
              submitText={ll["Edit Document"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              isPending={isPending}
              onClearedForm={() => {
                hideFeedbackMessage();
                markdownFieldRef.current?.setMarkdown(content);
              }}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
