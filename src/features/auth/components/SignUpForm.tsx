/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect, useRef } from "react";

// server actions and mutations
import signUp from "@/features/auth/actions/signUpForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { SignUpFormSchemaEn, SignUpFormSchemaPl } from "@/features/auth/schemas/signUpForm";
import useSignUpFormFeedback from "@/features/auth/hooks/feedbacks/useSignUpForm";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { UserIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface SignUpFormProps {
  preferredLang: Lang;
  ll: typeof LangLoader.prototype.signUpForm;
}

// constants
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/auth/constants/signUpForm";

export default function SignUpForm({ preferredLang, ll }: SignUpFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(signUp, INITIAL_FORM_STATE);
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
  const { feedbackMessage, hideFeedbackMessage } = useSignUpFormFeedback(hasPressedSubmitRef, formState, reset, store);

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
            <CardTitle>{ll["Sign Up"]}</CardTitle>
            <CardDescription>{ll["To create a new account"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="name"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLang === "en" ? SignUpFormSchemaEn.from.fields.name : SignUpFormSchemaPl.from.fields.name),
              }}
              children={(field) => (
                <field.TextField label={ll["Name"]} size={40} maxLength={26} spellCheck={false} autoComplete="name" placeholder={ll["e.g. John Doe"]} />
              )}
            />
            <AppField
              name="email"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLang === "en" ? SignUpFormSchemaEn.from.fields.email : SignUpFormSchemaPl.from.fields.email),
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
                onChange: Schema.standardSchemaV1(preferredLang === "en" ? SignUpFormSchemaEn.from.fields.password : SignUpFormSchemaPl.from.fields.password),
              }}
              children={(field) => (
                <field.PasswordField label={ll["Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
              )}
            />
            <AppField
              name="confirmPassword"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLang === "en" ? SignUpFormSchemaEn.from.fields.confirmPassword : SignUpFormSchemaPl.from.fields.confirmPassword,
                ),
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
              isPending={isPending}
              onClearedForm={hideFeedbackMessage}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
