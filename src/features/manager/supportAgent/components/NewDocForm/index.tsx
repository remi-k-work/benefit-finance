/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect, useRef } from "react";

// server actions and mutations
import newDoc from "@/features/manager/supportAgent/actions/newDocForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { NewDocFormSchemaEn, NewDocFormSchemaPl } from "@/features/manager/supportAgent/schemas/newDocForm";
import useNewDocFormFeedback from "@/features/manager/supportAgent/hooks/feedbacks/useNewDocForm";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface NewDocFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.manSupportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/manager/supportAgent/constants/newDocForm";

export default function NewDocForm({ preferredLanguage, ll, llFormToastFeedback }: NewDocFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(newDoc, INITIAL_FORM_STATE);
  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS,
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
  const { feedbackMessage, hideFeedbackMessage } = useNewDocFormFeedback(hasPressedSubmitRef, formState, reset, store, ll, llFormToastFeedback);

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
            <CardTitle>{ll["New Document"]}</CardTitle>
            <CardDescription>{ll["To create a new document for the support agent"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="title"
              validators={{ onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? NewDocFormSchemaEn.fields.title : NewDocFormSchemaPl.fields.title) }}
              children={(field) => (
                <field.TextField label={ll["Title"]} size={40} maxLength={51} spellCheck autoComplete="off" placeholder={ll["e.g., About Benefit Finance"]} />
              )}
            />
            <AppField
              name="content"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? NewDocFormSchemaEn.fields.content : NewDocFormSchemaPl.fields.content),
              }}
              children={(field) => (
                <field.TextAreaField
                  label={ll["Content"]}
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
                />
              )}
            />
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<DocumentPlusIcon className="size-9" />}
              submitText={ll["Create New Document"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              isPending={isPending}
              onClearedForm={hideFeedbackMessage}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
