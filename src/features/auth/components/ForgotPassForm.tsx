/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState } from "react";

// services, features, and other libraries
import { Effect, Schema } from "effect";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcAuthClient } from "@/features/auth/rpc/client";
import { initialFormState, mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { ForgotPassFormSchemaEn, ForgotPassFormSchemaPl } from "@/features/auth/schemas";
import { useForgotPassFormFeedback } from "@/features/auth/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface ForgotPassFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.forgotPassForm;
  llForgotPassFormFeedback: typeof LangLoader.prototype.forgotPassFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS_FP, INITIAL_FORM_STATE_FP } from "@/features/auth/constants";

const main = (formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { forgotPassForm } = yield* RpcAuthClient;

    const result = yield* forgotPassForm({ formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function ForgotPassForm({ preferredLanguage, ll, llForgotPassFormFeedback, llFormToastFeedback }: ForgotPassFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(formDataToRecord(formData))),
    INITIAL_FORM_STATE_FP,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS_FP,
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
    validators: { onMount: Schema.standardSchemaV1(preferredLanguage === "en" ? ForgotPassFormSchemaEn : ForgotPassFormSchemaPl) as any },
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useForgotPassFormFeedback(formState, reset, store, llForgotPassFormFeedback, llFormToastFeedback);

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
            <CardTitle>{ll["Forgot Your Password?"]}</CardTitle>
            <CardDescription>{ll["Enter your email below to reset password"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="email"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? ForgotPassFormSchemaEn.fields.email : ForgotPassFormSchemaPl.fields.email,
                ) as any,
              }}
              children={(field) => (
                <field.TextField
                  label={ll["Email"]}
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
              submitText={ll["Send Reset Link"]}
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
