/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect } from "react";

// services, features, and other libraries
import { Effect, Schema } from "effect";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcLeadsClient } from "@/features/leads/rpc/client";
import { initialFormState, mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { NewLeadFormSchemaEn, NewLeadFormSchemaPl } from "@/features/leads/schemas";
import { useNewLeadFormFeedback } from "@/features/leads/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import InfoLine from "@/components/Form/InfoLine";

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
import { FORM_OPTIONS_N, INITIAL_FORM_STATE_N } from "@/features/leads/constants";
import { SERVICE_OF_INTEREST_TEXTONLY } from "@/features/leads/constants";

const main = (formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { newLeadForm } = yield* RpcLeadsClient;

    const result = yield* newLeadForm({ formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function NewLeadForm({ preferredLanguage, ll, llFormToastFeedback }: NewLeadFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(formDataToRecord(formData))),
    INITIAL_FORM_STATE_N,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS_N,
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useNewLeadFormFeedback(formState, reset, store, ll, llFormToastFeedback);

  // Reset the form and hide the feedback message
  useEffect(() => {
    reset();
    hideFeedbackMessage();
  }, [reset, hideFeedbackMessage]);

  return (
    <AppForm>
      <form
        action={formAction}
        onSubmit={async () => {
          await handleSubmit();
        }}
      >
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>{ll["New Lead Submission"]}</CardTitle>
            <CardDescription>{ll["To submit a new lead to us"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="firstName"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.firstName : NewLeadFormSchemaPl.fields.firstName,
                ) as any,
              }}
              children={(field) => (
                <field.TextField
                  label={ll["First Name"]}
                  size={40}
                  maxLength={26}
                  spellCheck={false}
                  autoComplete="given-name"
                  placeholder={ll["e.g., John"]}
                />
              )}
            />
            <AppField
              name="lastName"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.lastName : NewLeadFormSchemaPl.fields.lastName,
                ) as any,
              }}
              children={(field) => (
                <field.TextField label={ll["Last Name"]} size={40} maxLength={26} spellCheck={false} autoComplete="family-name" placeholder={ll["e.g., Doe"]} />
              )}
            />
            <AppField
              name="email"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.email : NewLeadFormSchemaPl.fields.email) as any,
              }}
              children={(field) => (
                <field.TextField
                  label={ll["Email"]}
                  size={40}
                  maxLength={50}
                  spellCheck={false}
                  autoComplete="email"
                  placeholder={ll["e.g., john.doe@gmail.com"]}
                />
              )}
            />
            <AppField
              name="phone"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.phone : NewLeadFormSchemaPl.fields.phone) as any,
              }}
              children={(field) => (
                <field.TextField
                  type="tel"
                  label={ll["Phone"]}
                  size={40}
                  maxLength={12}
                  spellCheck={false}
                  autoComplete="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                  placeholder={ll["e.g., 333-444-444"]}
                />
              )}
            />
            <AppField
              name="serviceOfInterest"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.serviceOfInterest : NewLeadFormSchemaPl.fields.serviceOfInterest,
                ) as any,
              }}
              children={(field) => (
                <field.SelectField label={ll["Service of Interest"]} options={SERVICE_OF_INTEREST_TEXTONLY(ll)} placeholder={ll["Service of Interest"]} />
              )}
            />
            <AppField
              name="mustConfirmDataSharing"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.mustConfirmDataSharing.from : NewLeadFormSchemaPl.fields.mustConfirmDataSharing.from,
                ) as any,
              }}
              children={(field) => (
                <field.CheckBoxField
                  label={
                    ll[
                      "I declare that I have the valid and voluntary consent of the data subject to transfer his or her personal data to BENEFIT FINANCE LLC for the purpose of establishing commercial contact and that the data was obtained in accordance with the applicable provisions of the GDPR"
                    ]
                  }
                />
              )}
            />
            <AppField
              name="mustAcceptPartnershipTerms"
              validators={{
                onChange: Schema.standardSchemaV1(
                  preferredLanguage === "en"
                    ? NewLeadFormSchemaEn.fields.mustAcceptPartnershipTerms.from
                    : NewLeadFormSchemaPl.fields.mustAcceptPartnershipTerms.from,
                ) as any,
              }}
              children={(field) => <field.CheckBoxField label={ll["I accept the Terms and Conditions of Partnership"]} />}
            />
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<UserPlusIcon className="size-9" />}
              submitText={ll["Submit New Lead"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              isPending={isPending}
              onClearedForm={hideFeedbackMessage}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
