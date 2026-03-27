"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcAuthClient } from "@/features/auth/rpc/client";
import { resetPassFormBuilder } from "@/features/auth/schemas";
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

interface ResetPassFormProps {
  token: string;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.resetPassForm;
  llResetPassFormFeedback: typeof LangLoader.prototype.resetPassFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const resetPassForm = (token: string, preferredLanguage: Lang) =>
  FormReact.make(resetPassFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { newPassword: PasswordInput, confirmPassword: PasswordInput },
    onSubmit: (_, { decoded: { newPassword } }) =>
      Effect.gen(function* () {
        const { resetPassForm } = yield* RpcAuthClient;
        yield* resetPassForm({ token, newPassword });
      }),
  });

export default function ResetPassForm({ token, preferredLanguage, ll, llResetPassFormFeedback, llFormToastFeedback }: ResetPassFormProps) {
  // Get the form context
  const resetPassFormL = useMemo(() => resetPassForm(token, preferredLanguage), [token, preferredLanguage]);
  const submit = useAtomSet(resetPassFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    resetPassFormL,
    llFormToastFeedback,
    llResetPassFormFeedback["[RESET YOUR PASSWORD]"],
    llResetPassFormFeedback["The password has been reset. Please sign in with your new password."],
    undefined,
    "/sign-in",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Reset Your Password"]}</CardTitle>
        <CardDescription>{ll["Enter your new password below"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <resetPassFormL.Initialize defaultValues={{ newPassword: "", confirmPassword: "" }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <resetPassFormL.newPassword label={ll["New Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
            <br />
            <resetPassFormL.confirmPassword
              label={ll["Confirm Password"]}
              size={40}
              maxLength={129}
              autoComplete="new-password"
              placeholder={ll["e.g. P@ssw0rd!"]}
            />
            <br />
            <SubmitStatus
              form={resetPassFormL}
              ll={llFormToastFeedback}
              formName={llResetPassFormFeedback["[RESET YOUR PASSWORD]"]}
              succeededDesc={llResetPassFormFeedback["The password has been reset. Please sign in with your new password."]}
            />
            <FormSubmit
              form={resetPassFormL}
              submitIcon={<KeyIcon className="size-9" />}
              submitText={ll["Reset Password"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
            />
          </form>
        </resetPassFormL.Initialize>
      </CardContent>
    </Card>
  );
}
