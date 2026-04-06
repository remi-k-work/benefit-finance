/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { contactUsFormBuilder } from "@/features/contactUs/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { TextAreaInput, TextInput } from "@/components/Form/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form";
import Captcha from "@/features/captcha/components/Captcha";

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

const contactUsForm = (preferredLanguage: Lang) =>
  FormReact.make(contactUsFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: {
      name: TextInput,
      email: TextInput,
      subject: TextInput,
      phone: TextInput,
      message: TextAreaInput,
      captchaInput: TextInput,
    },
    onSubmit: (_, { decoded: {} }) => Effect.void,
  });

export default function ContactUsForm({ preferredLanguage, ll, llContactUsFormFeedback, llFormToastFeedback }: ContactUsFormProps) {
  // Get the form context
  const contactUsFormL = useMemo(() => contactUsForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(contactUsFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(contactUsFormL.submit, llFormToastFeedback, llContactUsFormFeedback["[CONTACT US]"], llContactUsFormFeedback["Your message has been sent."]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Contact Us"]}</CardTitle>
        <CardDescription>{ll["To get in touch with us"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <contactUsFormL.Initialize defaultValues={{ name: "", email: "", subject: "", phone: "", message: "", captchaInput: "" }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <contactUsFormL.name
              label={ll["Name"]}
              size={40}
              maxLength={26}
              spellCheck={false}
              autoComplete="name"
              placeholder={ll["Let us know who you are!"]}
            />
            <br />
            <contactUsFormL.email
              label={ll["Email"]}
              size={40}
              maxLength={50}
              spellCheck={false}
              autoComplete="email"
              placeholder={ll["We will answer you here"]}
            />
            <br />
            <contactUsFormL.subject
              label={ll["Subject"]}
              size={40}
              maxLength={41}
              spellCheck
              autoComplete="off"
              placeholder={ll["Question? Feedback? Let us know!"]}
            />
            <br />
            <contactUsFormL.phone
              type="tel"
              label={ll["Phone"]}
              size={40}
              maxLength={12}
              spellCheck={false}
              autoComplete="tel"
              placeholder={ll["e.g., 333-444-444"]}
            />
            <br />
            <contactUsFormL.message
              label={ll["Message"]}
              cols={50}
              rows={8}
              maxLength={2049}
              spellCheck
              autoComplete="off"
              placeholder={ll["How can we help you today?"]}
            />
            <br />
            <Captcha captchaName="captcha" />
            <br />
            <contactUsFormL.captchaInput
              label={ll["Captcha"]}
              size={40}
              maxLength={7}
              spellCheck={false}
              autoComplete="off"
              placeholder={ll["Enter the generated captcha"]}
            />
            <br />
            <SubmitStatus
              form={contactUsFormL}
              ll={llFormToastFeedback}
              formName={llContactUsFormFeedback["[CONTACT US]"]}
              succeededDesc={llContactUsFormFeedback["Your message has been sent."]}
            />
            <FormSubmit
              form={contactUsFormL}
              submitIcon={<PaperAirplaneIcon className="size-9" />}
              submitText={ll["Send Message"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
            />
          </form>
        </contactUsFormL.Initialize>
      </CardContent>
    </Card>
  );
}
