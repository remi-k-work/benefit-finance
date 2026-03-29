"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { passChangeFormBuilder } from "@/features/profile/schemas";
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

export default function PassChangeForm({ preferredLanguage, ll, llPassChangeFormFeedback, llFormToastFeedback }: PassChangeFormProps) {
  // Get the form context
  const passChangeFormL = useMemo(() => passChangeForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(passChangeFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    passChangeFormL.submit,
    llFormToastFeedback,
    llPassChangeFormFeedback["[PASSWORD CHANGE]"],
    llPassChangeFormFeedback["Your password has been changed."],
    undefined,
    undefined,
    true,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Password Change"]}</CardTitle>
        <CardDescription>{ll["Enter your new password below"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <passChangeFormL.Initialize defaultValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <passChangeFormL.currentPassword
              label={ll["Current Password"]}
              size={40}
              maxLength={129}
              autoComplete="current-password"
              placeholder={ll["e.g. P@ssw0rd!"]}
            />
            <br />
            <passChangeFormL.newPassword label={ll["New Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
            <br />
            <passChangeFormL.confirmPassword
              label={ll["Confirm Password"]}
              size={40}
              maxLength={129}
              autoComplete="new-password"
              placeholder={ll["e.g. P@ssw0rd!"]}
            />
            <br />
            <SubmitStatus
              form={passChangeFormL}
              ll={llFormToastFeedback}
              formName={llPassChangeFormFeedback["[PASSWORD CHANGE]"]}
              succeededDesc={llPassChangeFormFeedback["Your password has been changed."]}
            />
            <FormSubmit
              form={passChangeFormL}
              submitIcon={<KeyIcon className="size-9" />}
              submitText={ll["Change Password"]}
              resetText={ll["Clear Form"]}
              showCancel={false}
            />
          </form>
        </passChangeFormL.Initialize>
      </CardContent>
    </Card>
  );
}
