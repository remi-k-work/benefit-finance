"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcLeadsClient } from "@/features/leads/rpc/client";
import { newLeadFormBuilder } from "@/features/leads/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { CheckBoxInput, SelectInput, TextInput } from "@/components/Form2/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form2";

// assets
import { UserPlusIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface NewLeadFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.leads;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { SERVICE_OF_INTEREST_TEXTONLY } from "@/features/leads/constants";

const newLeadForm = (preferredLanguage: Lang) =>
  FormReact.make(newLeadFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: {
      firstName: TextInput,
      lastName: TextInput,
      email: TextInput,
      phone: TextInput,
      serviceOfInterest: SelectInput,
      mustConfirmDataSharing: CheckBoxInput,
      mustAcceptPartnershipTerms: CheckBoxInput,
    },
    onSubmit: (_, { decoded: { firstName, lastName, email, phone, serviceOfInterest, mustConfirmDataSharing, mustAcceptPartnershipTerms } }) =>
      Effect.gen(function* () {
        const { newLeadForm } = yield* RpcLeadsClient;
        yield* newLeadForm({ firstName, lastName, email, phone, serviceOfInterest, mustConfirmDataSharing, mustAcceptPartnershipTerms });
      }),
  });

export default function NewLeadForm({ preferredLanguage, ll, llFormToastFeedback }: NewLeadFormProps) {
  // Get the form context
  const newLeadFormL = useMemo(() => newLeadForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(newLeadFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    newLeadFormL.submit,
    llFormToastFeedback,
    ll["[NEW LEAD SUBMISSION]"],
    ll["The new lead has been submitted. Thank you!"],
    undefined,
    "/dashboard",
    true,
  );

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>{ll["New Lead Submission"]}</CardTitle>
        <CardDescription>{ll["To submit a new lead to us"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <newLeadFormL.Initialize
          defaultValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            serviceOfInterest: "not sure",
            mustConfirmDataSharing: false,
            mustAcceptPartnershipTerms: false,
          }}
        >
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <newLeadFormL.firstName
              label={ll["First Name"]}
              size={40}
              maxLength={26}
              spellCheck={false}
              autoComplete="given-name"
              placeholder={ll["e.g., John"]}
            />
            <br />
            <newLeadFormL.lastName
              label={ll["Last Name"]}
              size={40}
              maxLength={26}
              spellCheck={false}
              autoComplete="family-name"
              placeholder={ll["e.g., Doe"]}
            />
            <br />
            <newLeadFormL.email
              label={ll["Email"]}
              size={40}
              maxLength={50}
              spellCheck={false}
              autoComplete="email"
              placeholder={ll["e.g., john.doe@gmail.com"]}
            />
            <br />
            <newLeadFormL.phone
              type="tel"
              label={ll["Phone"]}
              size={40}
              maxLength={12}
              spellCheck={false}
              autoComplete="tel"
              placeholder={ll["e.g., 333-444-444"]}
            />
            <br />
            <newLeadFormL.serviceOfInterest
              label={ll["Service of Interest"]}
              options={SERVICE_OF_INTEREST_TEXTONLY(ll)}
              placeholder={ll["Service of Interest"]}
            />
            <br />
            <newLeadFormL.mustConfirmDataSharing
              label={
                ll[
                  "I declare that I have the valid and voluntary consent of the data subject to transfer his or her personal data to BENEFIT FINANCE LLC for the purpose of establishing commercial contact and that the data was obtained in accordance with the applicable provisions of the GDPR"
                ]
              }
            />
            <br />
            <newLeadFormL.mustAcceptPartnershipTerms label={ll["I accept the Terms and Conditions of Partnership"]} />
            <br />
            <SubmitStatus
              form={newLeadFormL}
              ll={llFormToastFeedback}
              formName={ll["[NEW LEAD SUBMISSION]"]}
              succeededDesc={ll["The new lead has been submitted. Thank you!"]}
            />
            <FormSubmit
              form={newLeadFormL}
              submitIcon={<UserPlusIcon className="size-9" />}
              submitText={ll["Submit New Lead"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
            />
          </form>
        </newLeadFormL.Initialize>
      </CardContent>
    </Card>
  );
}
