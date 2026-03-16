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
import { ResetPassFormSchemaEn, ResetPassFormSchemaPl } from "@/features/auth/schemas";
import { useResetPassFormFeedback } from "@/features/auth/hooks/feedbacks";

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
import { FORM_OPTIONS_RP, INITIAL_FORM_STATE_RP } from "@/features/auth/constants";

const main = (token: string, formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { resetPassForm } = yield* RpcAuthClient;

    const result = yield* resetPassForm({ token, formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function ResetPassForm({ token, preferredLanguage, ll, llResetPassFormFeedback, llFormToastFeedback }: ResetPassFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(token, formDataToRecord(formData))),
    INITIAL_FORM_STATE_RP,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS_RP,
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useResetPassFormFeedback(formState, reset, store, llResetPassFormFeedback, llFormToastFeedback);

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
