"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcAuthClient } from "@/features/auth/rpc/client";
import { signUpFormBuilder } from "@/features/auth/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { PasswordInput, TextInput } from "@/components/Form2/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form2";

// assets
import { UserIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface SignUpFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.signUpForm;
  llSignUpFormFeedback: typeof LangLoader.prototype.signUpFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const signUpForm = (preferredLanguage: Lang) =>
  FormReact.make(signUpFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { name: TextInput, email: TextInput, password: PasswordInput, confirmPassword: PasswordInput },
    onSubmit: (_, { decoded: { name, email, password } }) =>
      Effect.gen(function* () {
        const { signUpForm } = yield* RpcAuthClient;
        yield* signUpForm({ name, email, password });
      }),
  });

export default function SignUpForm({ preferredLanguage, ll, llSignUpFormFeedback, llFormToastFeedback }: SignUpFormProps) {
  // Get the form context
  const signUpFormL = useMemo(() => signUpForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(signUpFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    signUpFormL,
    llFormToastFeedback,
    llSignUpFormFeedback["[SIGN UP]"],
    llSignUpFormFeedback["You signed up successfully."],
    undefined,
    "/dashboard",
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Sign Up"]}</CardTitle>
        <CardDescription>{ll["To create a new account"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <signUpFormL.Initialize defaultValues={{ name: "", email: "", password: "", confirmPassword: "" }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <signUpFormL.name label={ll["Name"]} size={40} maxLength={26} spellCheck={false} autoComplete="name" placeholder={ll["e.g. John Doe"]} />
            <br />
            <signUpFormL.email
              label={ll["Email"]}
              size={40}
              maxLength={50}
              spellCheck={false}
              autoComplete="email"
              placeholder={ll["e.g. john.doe@gmail.com"]}
            />
            <br />
            <signUpFormL.password label={ll["Password"]} size={40} maxLength={129} autoComplete="new-password" placeholder={ll["e.g. P@ssw0rd!"]} />
            <br />
            <signUpFormL.confirmPassword
              label={ll["Confirm Password"]}
              size={40}
              maxLength={129}
              autoComplete="new-password"
              placeholder={ll["e.g. P@ssw0rd!"]}
            />
            <br />
            <SubmitStatus
              form={signUpFormL}
              ll={llFormToastFeedback}
              formName={llSignUpFormFeedback["[SIGN UP]"]}
              succeededDesc={llSignUpFormFeedback["You signed up successfully."]}
            />
            <FormSubmit
              form={signUpFormL}
              submitIcon={<UserIcon className="size-9" />}
              submitText={ll["Create New Account"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
            />
          </form>
        </signUpFormL.Initialize>
      </CardContent>
    </Card>
  );
}
