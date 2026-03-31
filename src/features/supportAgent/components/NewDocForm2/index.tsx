"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcSupportAgentClient } from "@/features/supportAgent/rpc/client";
import { newDocFormBuilder } from "@/features/supportAgent/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { MarkdownInput, TextInput } from "@/components/Form2/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form2";

// assets
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface NewDocFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.supportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const newDocForm = (preferredLanguage: Lang) =>
  FormReact.make(newDocFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { title: TextInput, content: MarkdownInput },
    onSubmit: (_, { decoded: { title, content } }) =>
      Effect.gen(function* () {
        const { newDocForm } = yield* RpcSupportAgentClient;
        // yield* newDocForm({ title, content });
      }),
  });

export default function NewDocForm({ preferredLanguage, ll, llFormToastFeedback }: NewDocFormProps) {
  // Get the form context
  const newDocFormL = useMemo(() => newDocForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(newDocFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    newDocFormL.submit,
    llFormToastFeedback,
    ll["[NEW DOCUMENT]"],
    ll["The new document has been created."],
    undefined,
    undefined, // "/manager/support-agent",
    true,
  );

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{ll["New Document"]}</CardTitle>
        <CardDescription>{ll["To create a new document for the support agent"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <newDocFormL.Initialize defaultValues={{ title: "", content: "" }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <newDocFormL.title label={ll["Title"]} size={40} maxLength={51} spellCheck autoComplete="off" placeholder={ll["e.g., About Benefit Finance"]} />
            <br />
            <newDocFormL.content
              label={ll["Content"]}
              spellCheck={false}
              placeholder={
                ll[
                  "e.g., Benefit Finance is a holistic wealth management company founded on the belief that financial freedom should be accessible to everyone."
                ]
              }
            />
            <br />
            <SubmitStatus
              form={newDocFormL}
              ll={llFormToastFeedback}
              formName={ll["[NEW DOCUMENT]"]}
              succeededDesc={ll["The new document has been created."]}
            />
            <FormSubmit
              form={newDocFormL}
              submitIcon={<DocumentPlusIcon className="size-9" />}
              submitText={ll["Create New Document"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
            />
          </form>
        </newDocFormL.Initialize>
      </CardContent>
    </Card>
  );
}
