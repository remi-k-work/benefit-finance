"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { emailChangeFormBuilder } from "@/features/profile/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { TextInput } from "@/components/Form2/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form2";

// assets
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

// types
import type { User } from "@/services/better-auth/auth";
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface EmailChangeFormProps {
  user: User;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.emailChangeForm;
  llEmailChangeFormFeedback: typeof LangLoader.prototype.emailChangeFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const emailChangeForm = (preferredLanguage: Lang) =>
  FormReact.make(emailChangeFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { newEmail: TextInput },
    onSubmit: (_, { decoded: { newEmail } }) =>
      Effect.gen(function* () {
        const { emailChangeForm } = yield* RpcProfileClient;
        yield* emailChangeForm({ newEmail });
      }),
  });

export default function EmailChangeForm({
  user: { email: newEmail, emailVerified: needsApproval },
  preferredLanguage,
  ll,
  llEmailChangeFormFeedback,
  llFormToastFeedback,
}: EmailChangeFormProps) {
  // Get the form context
  const emailChangeFormL = useMemo(() => emailChangeForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(emailChangeFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    emailChangeFormL,
    llFormToastFeedback,
    llEmailChangeFormFeedback["[EMAIL CHANGE]"],
    needsApproval
      ? llEmailChangeFormFeedback[
          "The email change has been initiated and needs to be approved. Please check your current email address for the approval link."
        ]
      : llEmailChangeFormFeedback["Your email has been changed successfully. A verification email has been sent to your new email address."],
    undefined,
    undefined,
    true,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Email Change"]}</CardTitle>
        <CardDescription>{ll["Enter your new email below"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <emailChangeFormL.Initialize defaultValues={{ newEmail }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <emailChangeFormL.newEmail
              label={ll["New Email"]}
              size={40}
              maxLength={50}
              spellCheck={false}
              autoComplete="email"
              placeholder={ll["e.g. john.doe@gmail.com"]}
            />
            <br />
            <SubmitStatus
              form={emailChangeFormL}
              ll={llFormToastFeedback}
              formName={llEmailChangeFormFeedback["[EMAIL CHANGE]"]}
              succeededDesc={
                needsApproval
                  ? llEmailChangeFormFeedback[
                      "The email change has been initiated and needs to be approved. Please check your current email address for the approval link."
                    ]
                  : llEmailChangeFormFeedback["Your email has been changed successfully. A verification email has been sent to your new email address."]
              }
            />
            <FormSubmit
              form={emailChangeFormL}
              submitIcon={<PaperAirplaneIcon className="size-9" />}
              submitText={ll["Request Email Change"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              showCancel={false}
            />
          </form>
        </emailChangeFormL.Initialize>
      </CardContent>
    </Card>
  );
}
