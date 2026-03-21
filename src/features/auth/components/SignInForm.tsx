/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect } from "react";

// next
import Link from "next/link";

// services, features, and other libraries
import { Effect, Schema } from "effect";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcAuthClient } from "@/features/auth/rpc/client";
import { initialFormState, mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { SignInFormSchemaEn, SignInFormSchemaPl } from "@/features/auth/schemas";
import { useSignInFormFeedback } from "@/features/auth/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";
import SignInSocial from "./SignInSocial";

// assets
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

// types
import type { Route } from "next";
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface SignInFormProps {
  redirect?: Route;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.signInForm;
  llSignInSocial: typeof LangLoader.prototype.signInSocial;
  llSignInFormFeedback: typeof LangLoader.prototype.signInFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS_SI, INITIAL_FORM_STATE_SI } from "@/features/auth/constants";

const main = (formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { signInForm } = yield* RpcAuthClient;

    const result = yield* signInForm({ formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function SignInForm({ redirect, preferredLanguage, ll, llSignInSocial, llSignInFormFeedback, llFormToastFeedback }: SignInFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(formDataToRecord(formData))),
    INITIAL_FORM_STATE_SI,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS_SI,
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useSignInFormFeedback(formState, reset, store, llSignInFormFeedback, llFormToastFeedback, redirect);

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
            <CardTitle>{ll["Sign In"]}</CardTitle>
            <CardDescription>{ll["To continue to your account"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="email"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? SignInFormSchemaEn.fields.email : SignInFormSchemaPl.fields.email) as any,
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
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? SignInFormSchemaEn.fields.password : SignInFormSchemaPl.fields.password) as any,
              }}
              children={(field) => (
                <field.PasswordField
                  label={ll["Password"]}
                  forgotPassHref="/forgot-password"
                  forgotPassText={ll["Forgot your password?"]}
                  size={40}
                  maxLength={129}
                  autoComplete="current-password"
                  placeholder={ll["e.g. P@ssw0rd!"]}
                />
              )}
            />
            <AppField name="rememberMe" children={(field) => <field.CheckBoxField label={ll["Remember Me (recommended on trusted devices)"]} />} />
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<ArrowRightEndOnRectangleIcon className="size-9" />}
              submitText={ll["Sign In"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              isPending={isPending}
              onClearedForm={hideFeedbackMessage}
            />
            <section className="mt-9 grid gap-4 border-t border-b px-6 py-6">
              <SignInSocial provider="google" redirect={redirect} ll={llSignInSocial} />
              <SignInSocial provider="github" redirect={redirect} ll={llSignInSocial} />
            </section>
            <p className="mt-9 text-center">
              {ll["New to BENEFIT FINANCE?"]}&nbsp;
              <Link href="/sign-up" className="link">
                {ll["Create an Account"]}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
