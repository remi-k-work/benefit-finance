/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { passChangeFormBuilder, passSetupFormBuilder } from "@/features/profile/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { PasswordInput } from "@/components/Form2/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form2";

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

const passChangeForm = (preferredLanguage: Lang) =>
  FormReact.make(passChangeFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { currentPassword: PasswordInput, newPassword: PasswordInput, confirmPassword: PasswordInput },
    onSubmit: (_, { decoded: { newPassword, currentPassword } }) =>
      Effect.gen(function* () {
        const { passChangeForm } = yield* RpcProfileClient;
        yield* passChangeForm({ newPassword, currentPassword });
      }),
  });

const passSetupForm = (preferredLanguage: Lang) =>
  FormReact.make(passSetupFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { newPassword: PasswordInput, confirmPassword: PasswordInput },
    onSubmit: (_, { decoded: { newPassword } }) =>
      Effect.gen(function* () {
        const { passChangeForm } = yield* RpcProfileClient;
        yield* passChangeForm({ newPassword });
      }),
  });

export default function PassChangeForm({ hasCredential, preferredLanguage, ll, llPassChangeFormFeedback, llFormToastFeedback }: PassChangeFormProps) {
  // Get the form context
  const passChangeFormL = useMemo(() => passChangeForm(preferredLanguage), [preferredLanguage]);
  const passChangeSubmit = useAtomSet(passChangeFormL.submit);
  const passSetupFormL = useMemo(() => passSetupForm(preferredLanguage), [preferredLanguage]);
  const passSetupSubmit = useAtomSet(passSetupFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    (hasCredential ? passChangeFormL : passSetupFormL) as any,
    llFormToastFeedback,
    hasCredential ? llPassChangeFormFeedback["[PASSWORD CHANGE]"] : llPassChangeFormFeedback["[PASSWORD SETUP]"],
    hasCredential ? llPassChangeFormFeedback["Your password has been changed."] : llPassChangeFormFeedback["Your password has been setup."],
    undefined,
    undefined,
    true,
  );

  return (
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
                ) as any,
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
                ) as any,
              }}
              children={(field) => (
                <field.PasswordField label={ll["Confirm Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
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
                ) as any,
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
                ) as any,
              }}
              children={(field) => (
                <field.PasswordField label={ll["Confirm Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
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
  );
}
