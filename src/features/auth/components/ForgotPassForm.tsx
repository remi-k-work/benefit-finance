/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect, useRef } from "react";

// server actions and mutations
import forgotPass from "@/features/auth/actions/forgotPassForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { ForgotPassFormSchemaEn, ForgotPassFormSchemaPl } from "@/features/auth/schemas/forgotPassForm";
import useForgotPassFormFeedback from "@/features/auth/hooks/feedbacks/useForgotPassForm";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface ForgotPassFormProps {
  preferredLang: Lang;
  ll: typeof LangLoader.prototype.forgotPassForm;
}

// constants
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/auth/constants/forgotPassForm";

export default function ForgotPassForm({ preferredLang, ll }: ForgotPassFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(forgotPass, INITIAL_FORM_STATE);
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
  const { feedbackMessage, hideFeedbackMessage } = useForgotPassFormFeedback(hasPressedSubmitRef, formState, reset, store);

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
            <CardTitle>{ll["Forgot Your Password?"]}</CardTitle>
            <CardDescription>{ll["Enter your email below to reset password"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="email"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLang === "en" ? ForgotPassFormSchemaEn.fields.email : ForgotPassFormSchemaPl.fields.email),
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
              isPending={isPending}
              onClearedForm={hideFeedbackMessage}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
