"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { passSetupFormBuilder } from "@/features/profile/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { PasswordInput } from "@/components/Form/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form";

// assets
import { KeyIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface PassSetupFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.passChangeForm;
  llPassChangeFormFeedback: typeof LangLoader.prototype.passChangeFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

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

export default function PassSetupForm({ preferredLanguage, ll, llPassChangeFormFeedback, llFormToastFeedback }: PassSetupFormProps) {
  // Get the form context
  const passSetupFormL = useMemo(() => passSetupForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(passSetupFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    passSetupFormL.submit,
    llFormToastFeedback,
    llPassChangeFormFeedback["[PASSWORD SETUP]"],
    llPassChangeFormFeedback["Your password has been setup."],
    undefined,
    undefined,
    true,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Password Setup"]}</CardTitle>
        <CardDescription>{ll["Setup your password below"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <passSetupFormL.Initialize defaultValues={{ newPassword: "", confirmPassword: "" }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <passSetupFormL.newPassword label={ll["New Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
            <br />
            <passSetupFormL.confirmPassword
              label={ll["Confirm Password"]}
              size={40}
              maxLength={129}
              autoComplete="new-password"
              placeholder={ll["e.g. P@ssw0rd!"]}
            />
            <br />
            <SubmitStatus
              form={passSetupFormL}
              ll={llFormToastFeedback}
              formName={llPassChangeFormFeedback["[PASSWORD SETUP]"]}
              succeededDesc={llPassChangeFormFeedback["Your password has been setup."]}
            />
            <FormSubmit
              form={passSetupFormL}
              submitIcon={<KeyIcon className="size-9" />}
              submitText={ll["Setup Password"]}
              resetText={ll["Clear Form"]}
              showCancel={false}
            />
          </form>
        </passSetupFormL.Initialize>
      </CardContent>
    </Card>
  );
}
