/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState } from "react";

// server actions and mutations
import newLeadForm from "@/features/leads/actions/newLeadForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { NewLeadFormSchemaEn, NewLeadFormSchemaPl } from "@/features/leads/schemas/newLeadForm";
import useNewLeadFormFeedback from "@/features/leads/hooks/feedbacks/useNewLeadForm";

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
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/leads/constants/newLeadForm";
import { SERVICE_OF_INTEREST_TEXTONLY } from "@/features/leads/constants";

export default function NewLeadForm({ preferredLanguage, ll, llFormToastFeedback }: NewLeadFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(newLeadForm, INITIAL_FORM_STATE);
  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS,
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useNewLeadFormFeedback(formState, reset, store, ll, llFormToastFeedback);

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
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.firstName : NewLeadFormSchemaPl.fields.firstName),
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
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.lastName : NewLeadFormSchemaPl.fields.lastName),
              }}
              children={(field) => (
                <field.TextField label={ll["Last Name"]} size={40} maxLength={26} spellCheck={false} autoComplete="family-name" placeholder={ll["e.g., Doe"]} />
              )}
            />
            <AppField
              name="email"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.email : NewLeadFormSchemaPl.fields.email),
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
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? NewLeadFormSchemaEn.fields.phone : NewLeadFormSchemaPl.fields.phone),
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
                ),
              }}
              children={(field) => (
                <field.SelectField label={ll["Service of Interest"]} options={SERVICE_OF_INTEREST_TEXTONLY(ll)} placeholder={ll["Service of Interest"]} />
              )}
            />
            <AppField
              name="mustConfirmDataSharing"
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
