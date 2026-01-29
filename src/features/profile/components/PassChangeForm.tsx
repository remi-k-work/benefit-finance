/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect, useRef } from "react";

// server actions and mutations
import passChange from "@/features/profile/actions/passChangeForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { PassChangeFormSchemaEn, PassChangeFormSchemaPl, PassSetupFormSchemaEn, PassSetupFormSchemaPl } from "@/features/profile/schemas/passChangeForm";
import usePassChangeFormFeedback from "@/features/profile/hooks/feedbacks/usePassChangeForm";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { KeyIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface PassChangeFormProps {
  hasCredential: boolean;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.passChangeForm;
  llPassChangeFormFeedback: typeof LangLoader.prototype.passChangeFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS_CHANGE, FORM_OPTIONS_SETUP, INITIAL_FORM_STATE } from "@/features/profile/constants/passChangeForm";

export default function PassChangeForm({ hasCredential, preferredLanguage, ll, llPassChangeFormFeedback, llFormToastFeedback }: PassChangeFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(passChange.bind(null, hasCredential), INITIAL_FORM_STATE);
  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...(hasCredential ? FORM_OPTIONS_CHANGE : FORM_OPTIONS_SETUP),
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
  const { feedbackMessage, hideFeedbackMessage } = usePassChangeFormFeedback(
    hasPressedSubmitRef,
    formState,
    reset,
    store,
    hasCredential,
    llPassChangeFormFeedback,
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
            <CardTitle>{hasCredential ? ll["Password Change"] : ll["Password Setup"]}</CardTitle>
            <CardDescription>{hasCredential ? ll["Enter your new password below"] : ll["Setup your password below"]}</CardDescription>
          </CardHeader>
          <CardContent>
            {hasCredential ? (
              <>
                <AppField
                  name={"currentPassword" as any}
                  validators={{
                    onChange: Schema.standardSchemaV1(
                      preferredLanguage === "en" ? PassChangeFormSchemaEn.from.fields.currentPassword : PassChangeFormSchemaPl.from.fields.currentPassword,
                    ),
                  }}
                  children={(field) => (
                    <field.PasswordField
                      label={ll["Current Password"]}
                      size={40}
                      maxLength={129}
                      autoComplete="current-password"
                      placeholder={ll["e.g. P@ssw0rd!"]}
                    />
                  )}
                />
                <AppField
                  name="newPassword"
                  validators={{
                    onChange: Schema.standardSchemaV1(
                      preferredLanguage === "en" ? PassChangeFormSchemaEn.from.fields.newPassword : PassChangeFormSchemaPl.from.fields.newPassword,
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
                      preferredLanguage === "en" ? PassChangeFormSchemaEn.from.fields.confirmPassword : PassChangeFormSchemaPl.from.fields.confirmPassword,
                    ),
                  }}
                  children={(field) => (
                    <field.PasswordField
                      label={ll["Confirm Password"]}
                      size={40}
                      maxLength={129}
                      autoComplete="new-password"
                      placeholder={ll["e.g. P@ssw0rd!"]}
                    />
                  )}
                />
              </>
            ) : (
              <>
                <AppField
                  name="newPassword"
                  validators={{
                    onChange: Schema.standardSchemaV1(
                      preferredLanguage === "en" ? PassSetupFormSchemaEn.from.fields.newPassword : PassSetupFormSchemaPl.from.fields.newPassword,
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
                      preferredLanguage === "en" ? PassSetupFormSchemaEn.from.fields.confirmPassword : PassSetupFormSchemaPl.from.fields.confirmPassword,
                    ),
                  }}
                  children={(field) => (
                    <field.PasswordField
                      label={ll["Confirm Password"]}
                      size={40}
                      maxLength={129}
                      autoComplete="new-password"
                      placeholder={ll["e.g. P@ssw0rd!"]}
                    />
                  )}
                />
              </>
            )}
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<KeyIcon className="size-9" />}
              submitText={hasCredential ? ll["Change Password"] : ll["Setup Password"]}
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
