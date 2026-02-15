/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect, useRef } from "react";

// drizzle and db access
import type { Doc } from "@/features/supportAgent/db";

// server actions and mutations
import editDoc from "@/features/manager/supportAgent/actions/editDocForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { EditDocFormSchemaEn, EditDocFormSchemaPl } from "@/features/manager/supportAgent/schemas/editDocForm";
import useEditDocFormFeedback from "@/features/manager/supportAgent/hooks/feedbacks/useEditDocForm";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { DocumentTextIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";
import type { MDXEditorMethods } from "@mdxeditor/editor";

interface EditDocFormProps {
  doc: Doc;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.manSupportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/manager/supportAgent/constants/editDocForm";

export default function EditDocForm({ doc: { id: docId, title, content }, preferredLanguage, ll, llFormToastFeedback }: EditDocFormProps) {
  // Create a ref to the editor component
  const markdownFieldRef = useRef<MDXEditorMethods>(null);

  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(editDoc.bind(null, docId), INITIAL_FORM_STATE);
  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS,
    defaultValues: { ...FORM_OPTIONS.defaultValues, title, content, markdown: content },
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
  });

  // Track if the user has pressed the submit button
  const hasPressedSubmitRef = useRef(false);

  // All this new cleanup code is for the <Activity /> boundary
  useEffect(() => {
    // Reset the flag when the component unmounts
    return () => {
      hasPressedSubmitRef.current = false;
    };
  }, []);

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useEditDocFormFeedback(
    hasPressedSubmitRef,
    formState,
    () => {
      reset();
      markdownFieldRef.current?.setMarkdown("");
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
          hasPressedSubmitRef.current = true;
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
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? EditDocFormSchemaEn.fields.title : EditDocFormSchemaPl.fields.title),
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
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? EditDocFormSchemaEn.fields.content : EditDocFormSchemaPl.fields.content),
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
              submitIcon={<DocumentTextIcon className="size-9" />}
              submitText={ll["Edit Document"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              isPending={isPending}
              onClearedForm={() => {
                hideFeedbackMessage();
                markdownFieldRef.current?.setMarkdown("");
              }}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
