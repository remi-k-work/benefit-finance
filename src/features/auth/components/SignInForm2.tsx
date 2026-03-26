"use client";

// react
import { useMemo } from "react";

// next
import Link from "next/link";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcAuthClient } from "@/features/auth/rpc/client";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { formBuilder } from "@/features/auth/schemas";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { CheckBoxInput, PasswordInput, TextInput } from "@/components/Form2/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form2";
import SignInSocial from "./SignInSocial";

// assets
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

// types
import type { Route } from "next";
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface SignInFormProps {
  redirect?: Route;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.signInForm;
  llSignInSocial: typeof LangLoader.prototype.signInSocial;
  llSignInFormFeedback: typeof LangLoader.prototype.signInFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const main = (formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { signInForm } = yield* RpcAuthClient;

    const result = yield* signInForm({ formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

const signInForm = (preferredLanguage: Lang) =>
  FormReact.make(formBuilder(preferredLanguage), {
    fields: { email: TextInput, password: PasswordInput, rememberMe: CheckBoxInput },
    onSubmit: (_, { decoded: { email, password, rememberMe } }) =>
      Effect.gen(function* () {
        yield* Effect.sleep(5000);
        yield* Effect.log(`Login successful: ${email} ${password} ${rememberMe}`);
        return { email, password, rememberMe };
      }),
  });

export default function SignInForm({ redirect, preferredLanguage, ll, llSignInSocial, llSignInFormFeedback, llFormToastFeedback }: SignInFormProps) {
  const signInFormL = useMemo(() => signInForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(signInFormL.submit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Sign In"]}</CardTitle>
        <CardDescription>{ll["To continue to your account"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <signInFormL.Initialize defaultValues={{ email: "", password: "", rememberMe: false }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <signInFormL.email
              label={ll["Email"]}
              size={40}
              maxLength={50}
              spellCheck={false}
              autoComplete="email"
              placeholder={ll["e.g. john.doe@gmail.com"]}
            />
            <br />
            <signInFormL.password
              label={ll["Password"]}
              forgotPassHref="/forgot-password"
              forgotPassText={ll["Forgot your password?"]}
              size={40}
              maxLength={129}
              autoComplete="current-password"
              placeholder={ll["e.g. P@ssw0rd!"]}
            />
            <br />
            <signInFormL.rememberMe label={ll["Remember Me (recommended on trusted devices)"]} />
            <br />
            <SubmitStatus
              form={signInFormL}
              formName={llSignInFormFeedback["[SIGN IN]"]}
              succeededDesc={llSignInFormFeedback["You signed in successfully."]}
              redirectTo={redirect ?? "/dashboard"}
              llFormToastFeedback={llFormToastFeedback}
            />
            <FormSubmit
              form={signInFormL}
              submitIcon={<ArrowRightEndOnRectangleIcon className="size-9" />}
              submitText={ll["Sign In"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
            />
          </form>
        </signInFormL.Initialize>
      </CardContent>
      <CardFooter>
        <section className="mt-9 grid gap-4 border-t border-b px-6 py-6">
          <SignInSocial provider="google" redirect={redirect} ll={llSignInSocial} />
          <SignInSocial provider="github" redirect={redirect} ll={llSignInSocial} />
        </section>
        <p className="mt-9 text-center">
          {ll["New to BENEFIT FINANCE?"]}&nbsp;
          <Link href="/sign-up" className="link">
            {ll["Create an Account"]}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
