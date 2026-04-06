"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcAuthClient } from "@/features/auth/rpc/client";
import { forgotPassFormBuilder } from "@/features/auth/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { TextInput } from "@/components/Form/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form";

// assets
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface ForgotPassFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.forgotPassForm;
  llForgotPassFormFeedback: typeof LangLoader.prototype.forgotPassFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const forgotPassForm = (preferredLanguage: Lang) =>
  FormReact.make(forgotPassFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { email: TextInput },
    onSubmit: (_, { decoded: { email } }) =>
      Effect.gen(function* () {
        const { forgotPassForm } = yield* RpcAuthClient;
        yield* forgotPassForm({ email });
      }),
  });

export default function ForgotPassForm({ preferredLanguage, ll, llForgotPassFormFeedback, llFormToastFeedback }: ForgotPassFormProps) {
  // Get the form context
  const forgotPassFormL = useMemo(() => forgotPassForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(forgotPassFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    forgotPassFormL.submit,
    llFormToastFeedback,
    llForgotPassFormFeedback["[FORGOT YOUR PASSWORD?]"],
    llForgotPassFormFeedback["We have sent the password reset link."],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Forgot Your Password?"]}</CardTitle>
        <CardDescription>{ll["Enter your email below to reset password"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <forgotPassFormL.Initialize defaultValues={{ email: "" }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <forgotPassFormL.email
              label={ll["Email"]}
              size={40}
              maxLength={50}
              spellCheck={false}
              autoComplete="email"
              placeholder={ll["e.g. john.doe@gmail.com"]}
            />
            <br />
            <SubmitStatus
              form={forgotPassFormL}
              ll={llFormToastFeedback}
              formName={llForgotPassFormFeedback["[FORGOT YOUR PASSWORD?]"]}
              succeededDesc={llForgotPassFormFeedback["We have sent the password reset link."]}
            />
            <FormSubmit
              form={forgotPassFormL}
              submitIcon={<PaperAirplaneIcon className="size-9" />}
              submitText={ll["Send Reset Link"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
            />
          </form>
        </forgotPassFormL.Initialize>
      </CardContent>
    </Card>
  );
}
