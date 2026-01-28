/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect, useRef } from "react";

// next
import Link from "next/link";

// server actions and mutations
import signIn from "@/features/auth/actions/signInForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { SignInFormSchemaEn, SignInFormSchemaPl } from "@/features/auth/schemas/signInForm";
import useSignInFormFeedback from "@/features/auth/hooks/feedbacks/useSignInForm";

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
  preferredLang: Lang;
  ll: typeof LangLoader.prototype.signInForm;
  llSignInSocial: typeof LangLoader.prototype.signInSocial;
}

// constants
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/auth/constants/signInForm";

export default function SignInForm({ redirect, preferredLang, ll, llSignInSocial }: SignInFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(signIn, INITIAL_FORM_STATE);
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
  const { feedbackMessage, hideFeedbackMessage } = useSignInFormFeedback(hasPressedSubmitRef, formState, reset, store, redirect);

  return (
    <AppForm>
      <form
        action={formAction}
        onSubmit={async () => {
          await handleSubmit();
          hasPressedSubmitRef.current = true;
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
              validators={{ onChange: Schema.standardSchemaV1(preferredLang === "en" ? SignInFormSchemaEn.fields.email : SignInFormSchemaPl.fields.email) }}
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
                onChange: Schema.standardSchemaV1(preferredLang === "en" ? SignInFormSchemaEn.fields.password : SignInFormSchemaPl.fields.password),
              }}
              children={(field) => (
                <field.PasswordField
                  label={ll["Password"]}
                  forgotPassHref="/forgot-password"
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
