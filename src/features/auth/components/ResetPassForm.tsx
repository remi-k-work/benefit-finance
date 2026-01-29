/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect, useRef } from "react";

// server actions and mutations
import resetPass from "@/features/auth/actions/resetPassForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { ResetPassFormSchemaEn, ResetPassFormSchemaPl } from "@/features/auth/schemas/resetPassForm";
import useResetPassFormFeedback from "@/features/auth/hooks/feedbacks/useResetPassForm";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { KeyIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface ResetPassFormProps {
  token: string;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.resetPassForm;
  llResetPassFormFeedback: typeof LangLoader.prototype.resetPassFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/auth/constants/resetPassForm";

export default function ResetPassForm({ token, preferredLanguage, ll, llResetPassFormFeedback, llFormToastFeedback }: ResetPassFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(resetPass.bind(null, token), INITIAL_FORM_STATE);
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
  const { feedbackMessage, hideFeedbackMessage } = useResetPassFormFeedback(
    hasPressedSubmitRef,
    formState,
    reset,
    store,
    llResetPassFormFeedback,
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
        <Card>
          <CardHeader>
            <CardTitle>{ll["Reset Your Password"]}</CardTitle>
            <CardDescription>{ll["Enter your new password below"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="newPassword"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? ResetPassFormSchemaEn.from.fields.newPassword : ResetPassFormSchemaPl.from.fields.newPassword,
                ),
              }}
              children={(field) => (
                <field.PasswordField label={ll["New Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
              )}
            />
            <AppField
              name="confirmPassword"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? ResetPassFormSchemaEn.from.fields.confirmPassword : ResetPassFormSchemaPl.from.fields.confirmPassword,
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
              submitIcon={<KeyIcon className="size-9" />}
              submitText={ll["Reset Password"]}
              isPending={isPending}
              onClearedForm={hideFeedbackMessage}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
