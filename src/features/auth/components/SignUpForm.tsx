/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect } from "react";

// services, features, and other libraries
import { Effect, Schema } from "effect";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcAuthClient } from "@/features/auth/rpc/client";
import { initialFormState, mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { SignUpFormSchemaEn, SignUpFormSchemaPl } from "@/features/auth/schemas";
import { useSignUpFormFeedback } from "@/features/auth/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { UserIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface SignUpFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.signUpForm;
  llSignUpFormFeedback: typeof LangLoader.prototype.signUpFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS_SU, INITIAL_FORM_STATE_SU } from "@/features/auth/constants";

const main = (formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { signUpForm } = yield* RpcAuthClient;

    const result = yield* signUpForm({ formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function SignUpForm({ preferredLanguage, ll, llSignUpFormFeedback, llFormToastFeedback }: SignUpFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(formDataToRecord(formData))),
    INITIAL_FORM_STATE_SU,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS_SU,
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useSignUpFormFeedback(formState, reset, store, llSignUpFormFeedback, llFormToastFeedback);

  // Reset the form and hide the feedback message
  useEffect(() => {
    reset();
    hideFeedbackMessage();
  }, [reset, hideFeedbackMessage]);

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
            <CardTitle>{ll["Sign Up"]}</CardTitle>
            <CardDescription>{ll["To create a new account"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="name"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? SignUpFormSchemaEn.from.fields.name : SignUpFormSchemaPl.from.fields.name,
                ) as any,
              }}
              children={(field) => (
                <field.TextField label={ll["Name"]} size={40} maxLength={26} spellCheck={false} autoComplete="name" placeholder={ll["e.g. John Doe"]} />
              )}
            />
            <AppField
              name="email"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? SignUpFormSchemaEn.from.fields.email : SignUpFormSchemaPl.from.fields.email,
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
            <AppField
              name="password"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? SignUpFormSchemaEn.from.fields.password : SignUpFormSchemaPl.from.fields.password,
                ) as any,
              }}
              children={(field) => (
                <field.PasswordField label={ll["Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
              )}
            />
            <AppField
              name="confirmPassword"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? SignUpFormSchemaEn.from.fields.confirmPassword : SignUpFormSchemaPl.from.fields.confirmPassword,
                ) as any,
              }}
              children={(field) => (
                <field.PasswordField label={ll["Confirm Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
              )}
            />
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<UserIcon className="size-9" />}
              submitText={ll["Create New Account"]}
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
