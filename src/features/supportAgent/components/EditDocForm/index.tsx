"use client";

// react
import { useMemo } from "react";

// drizzle and db access
import type { Doc } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcSupportAgentClient } from "@/features/supportAgent/rpc/client";
import { editDocFormBuilder } from "@/features/supportAgent/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { MarkdownInput, TextInput } from "@/components/Form/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface EditDocFormProps {
  doc: Doc;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.supportAgent;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const editDocForm = (docId: string, preferredLanguage: Lang) =>
  FormReact.make(editDocFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { title: TextInput, content: MarkdownInput },
    onSubmit: (_, { decoded: { title, content } }) =>
      Effect.gen(function* () {
        const { editDocForm } = yield* RpcSupportAgentClient;
        yield* editDocForm({ docId, title, content });
      }),
  });

export default function EditDocForm({ doc: { id: docId, title, content }, preferredLanguage, ll, llFormToastFeedback }: EditDocFormProps) {
  // Get the form context
  const editDocFormL = useMemo(() => editDocForm(docId, preferredLanguage), [docId, preferredLanguage]);
  const submit = useAtomSet(editDocFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    editDocFormL.submit,
    llFormToastFeedback,
    ll["[EDIT DOCUMENT]"],
    ll["The document has been updated."],
    undefined,
    "/manager/support-agent",
    true,
  );

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{ll["Edit Document"]}</CardTitle>
        <CardDescription>{ll["To edit an existing document for the support agent"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <editDocFormL.Initialize defaultValues={{ title, content }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <editDocFormL.title label={ll["Title"]} size={40} maxLength={51} spellCheck autoComplete="off" placeholder={ll["e.g., About Benefit Finance"]} />
            <br />
            <editDocFormL.content
              label={ll["Content"]}
              spellCheck={false}
              placeholder={
                ll[
                  "e.g., Benefit Finance is a holistic wealth management company founded on the belief that financial freedom should be accessible to everyone."
                ]
              }
            />
            <br />
            <SubmitStatus form={editDocFormL} ll={llFormToastFeedback} formName={ll["[EDIT DOCUMENT]"]} succeededDesc={ll["The document has been updated."]} />
            <FormSubmit
              form={editDocFormL}
              submitIcon={<PencilSquareIcon className="size-9" />}
              submitText={ll["Edit Document"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
            />
          </form>
        </editDocFormL.Initialize>
      </CardContent>
    </Card>
  );
}
