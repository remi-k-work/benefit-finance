/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState } from "react";

// services, features, and other libraries
import { Effect, Schema } from "effect";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { initialFormState, mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { EmailChangeFormSchemaEn, EmailChangeFormSchemaPl } from "@/features/profile/schemas";
import { useEmailChangeFormFeedback } from "@/features/profile/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

// types
import type { User } from "@/services/better-auth/auth";
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface EmailChangeFormProps {
  user: User;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.emailChangeForm;
  llEmailChangeFormFeedback: typeof LangLoader.prototype.emailChangeFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS_EC, INITIAL_FORM_STATE_EC } from "@/features/profile/constants";

const main = (formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { emailChangeForm } = yield* RpcProfileClient;

    const result = yield* emailChangeForm({ formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function EmailChangeForm({
  user: { email: currentEmail, emailVerified: needsApproval },
  preferredLanguage,
  ll,
  llEmailChangeFormFeedback,
  llFormToastFeedback,
}: EmailChangeFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(formDataToRecord(formData))),
    INITIAL_FORM_STATE_EC,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS_EC,
    defaultValues: { ...FORM_OPTIONS_EC.defaultValues, newEmail: currentEmail },
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
    validators: { onMount: Schema.standardSchemaV1(preferredLanguage === "en" ? EmailChangeFormSchemaEn : EmailChangeFormSchemaPl) as any },
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useEmailChangeFormFeedback(
    formState,
    reset,
    store,
    needsApproval,
    llEmailChangeFormFeedback,
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
        <Card>
          <CardHeader>
            <CardTitle>{ll["Email Change"]}</CardTitle>
            <CardDescription>{ll["Enter your new email below"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="newEmail"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? EmailChangeFormSchemaEn.fields.newEmail : EmailChangeFormSchemaPl.fields.newEmail,
                ) as any,
              }}
              children={(field) => (
                <field.TextField
                  label={ll["New Email"]}
                  size={40}
                  maxLength={50}
                  spellCheck={false}
                  autoComplete="email"
                  placeholder={ll["e.g. john.doe@gmail.com"]}
                />
              )}
            />
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<PaperAirplaneIcon className="size-9" />}
              submitText={ll["Request Email Change"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              isPending={isPending}
              showCancel={false}
              onClearedForm={hideFeedbackMessage}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
