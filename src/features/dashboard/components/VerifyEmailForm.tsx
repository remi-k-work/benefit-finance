"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcDashboardClient } from "@/features/dashboard/rpc/client";
import { verifyEmailFormBuilder } from "@/features/dashboard/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { TextInput } from "@/components/Form2/Inputs";
import { FormSubmit, InfoLine, SubmitStatus } from "@/components/Form2";

// assets
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

// types
import type { User } from "@/services/better-auth/auth";
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface VerifyEmailFormProps {
  user: User;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.verifyEmail;
  llVerifyEmailFeedback: typeof LangLoader.prototype.verifyEmailFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const verifyEmailForm = (preferredLanguage: Lang) =>
  FormReact.make(verifyEmailFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { email: TextInput },
    onSubmit: () =>
      Effect.gen(function* () {
        const { verifyEmail } = yield* RpcDashboardClient;
        yield* verifyEmail();
      }),
  });

export default function VerifyEmailForm({
  user: { email, emailVerified },
  preferredLanguage,
  ll,
  llVerifyEmailFeedback,
  llFormToastFeedback,
}: VerifyEmailFormProps) {
  // Get the form context
  const verifyEmailFormL = useMemo(() => verifyEmailForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(verifyEmailFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    verifyEmailFormL,
    llFormToastFeedback,
    llVerifyEmailFeedback["[VERIFY EMAIL]"],
    llVerifyEmailFeedback["A verification email has been sent to your current email address. Please check your inbox."],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Verify Email"]}</CardTitle>
        <CardDescription>{ll["To access all our features"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <verifyEmailFormL.Initialize defaultValues={{ email }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <verifyEmailFormL.email
              label={ll["Email"]}
              size={40}
              maxLength={50}
              spellCheck={false}
              autoComplete="email"
              placeholder={ll["e.g. john.doe@gmail.com"]}
              disabled
            />
            <br />
            {emailVerified ? (
              <InfoLine message={ll["Your email has been verified. Thank you!"]} className="mx-0 mb-0" />
            ) : (
              <>
                <SubmitStatus
                  form={verifyEmailFormL}
                  ll={llFormToastFeedback}
                  formName={llVerifyEmailFeedback["[VERIFY EMAIL]"]}
                  succeededDesc={llVerifyEmailFeedback["A verification email has been sent to your current email address. Please check your inbox."]}
                />
                <FormSubmit
                  form={verifyEmailFormL}
                  submitIcon={<CheckBadgeIcon className="size-9" />}
                  submitText={ll["Verify Email"]}
                  showReset={false}
                  showCancel={false}
                  isStateless
                  cooldown="9 seconds"
                />
              </>
            )}
          </form>
        </verifyEmailFormL.Initialize>
      </CardContent>
    </Card>
  );
}
