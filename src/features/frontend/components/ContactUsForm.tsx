/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState, useEffect, useRef } from "react";

// server actions and mutations
import contactUs from "@/features/frontend/actions/contactUsForm";

// services, features, and other libraries
import { Schema } from "effect";
import { mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { ContactUsFormSchemaEn, ContactUsFormSchemaPl } from "@/features/frontend/schemas/contactUsForm";
import useContactUsFormFeedback from "@/features/frontend/hooks/feedbacks/useContactUsForm";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import Captcha from "@/features/captcha/components/Captcha";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

// types
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface ContactUsFormProps {
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.contactUsForm;
  llContactUsFormFeedback: typeof LangLoader.prototype.contactUsFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

// constants
import { FORM_OPTIONS, INITIAL_FORM_STATE } from "@/features/frontend/constants/contactUsForm";

export default function ContactUsForm({ preferredLanguage, ll, llContactUsFormFeedback, llFormToastFeedback }: ContactUsFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(contactUs, INITIAL_FORM_STATE);
  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS,
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
  });

  // Track if the user has pressed the submit button
  const hasPressedSubmitRef = useRef(false);

  // All this new cleanup code is for the <Activity /> boundary
  useEffect(() => {
    // Reset the flag when the component unmounts
    return () => {
      hasPressedSubmitRef.current = false;
    };
  }, []);

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useContactUsFormFeedback(
    hasPressedSubmitRef,
    formState,
    reset,
    store,
    llContactUsFormFeedback,
    llFormToastFeedback,
  );

  return (
    <AppForm>
      <form
        action={formAction}
        onSubmit={async () => {
          await handleSubmit();
          hasPressedSubmitRef.current = true;
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{ll["Contact Us"]}</CardTitle>
            <CardDescription>{ll["To get in touch with us"]}</CardDescription>
          </CardHeader>
          <CardContent>
            <AppField
              name="name"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? ContactUsFormSchemaEn.fields.name : ContactUsFormSchemaPl.fields.name),
              }}
              children={(field) => (
                <field.TextField
                  label={ll["Name"]}
                  size={40}
                  maxLength={26}
                  spellCheck={false}
                  autoComplete="name"
                  placeholder={ll["Let us know who you are!"]}
                />
              )}
            />
            <AppField
              name="email"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? ContactUsFormSchemaEn.fields.email : ContactUsFormSchemaPl.fields.email),
              }}
              children={(field) => (
                <field.TextField
                  label={ll["Email"]}
                  size={40}
                  maxLength={50}
                  spellCheck={false}
                  autoComplete="email"
                  placeholder={ll["We will answer you here"]}
                />
              )}
            />
            <AppField
              name="subject"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? ContactUsFormSchemaEn.fields.subject : ContactUsFormSchemaPl.fields.subject),
              }}
              children={(field) => (
                <field.TextField
                  label={ll["Subject"]}
                  size={40}
                  maxLength={41}
                  spellCheck
                  autoComplete="off"
                  placeholder={ll["Question? Feedback? Let us know!"]}
                />
              )}
            />
            <AppField
              name="phone"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? ContactUsFormSchemaEn.fields.phone : ContactUsFormSchemaPl.fields.phone),
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
                  placeholder={ll["e.g. 333-444-4444"]}
                />
              )}
            />
            <AppField
              name="message"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? ContactUsFormSchemaEn.fields.message : ContactUsFormSchemaPl.fields.message),
              }}
              children={(field) => (
                <field.TextAreaField
                  label={ll["Message"]}
                  cols={50}
                  rows={8}
                  maxLength={2049}
                  spellCheck
                  autoComplete="off"
                  placeholder={ll["How can we help you today?"]}
                />
              )}
            />
            <br />
            <Captcha captchaName="captcha" />
            <br />
            <AppField
              name="captcha"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? ContactUsFormSchemaEn.fields.message : ContactUsFormSchemaPl.fields.message),
              }}
              children={(field) => (
                <field.TextField
                  label={ll["Captcha"]}
                  size={40}
                  maxLength={7}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder={ll["Enter the generated captcha"]}
                />
              )}
            />
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<PaperAirplaneIcon className="size-9" />}
              submitText={ll["Send Message"]}
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
