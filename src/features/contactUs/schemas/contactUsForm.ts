// services, features, and other libraries
import { Effect } from "effect";
import { FormBuilder } from "@lucas-barake/effect-form-react";
import { RpcCaptchaClient } from "@/features/captcha/rpc/client";

// schemas
import { EmailField, NameField, PhoneField } from "@/schemas";
import { MessageField, SubjectField } from "@/features/contactUs/schemas";
import { CaptchaInputField } from "@/features/captcha/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const contactUsFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty
    .addField(NameField(preferredLanguage))
    .addField(EmailField(preferredLanguage))
    .addField(SubjectField(preferredLanguage))
    .addField(PhoneField(preferredLanguage))
    .addField(MessageField(preferredLanguage))
    .addField(CaptchaInputField(preferredLanguage))
    .refineEffect(({ captchaInput }) =>
      Effect.gen(function* () {
        // Check the captcha to ensure it matches
        const { isCaptchaValid } = yield* RpcCaptchaClient;
        if (!(yield* isCaptchaValid({ captchaInput })))
          return { path: ["captchaInput"], message: preferredLanguage === "en" ? "Entered captcha is invalid" : "Wpisana captcha jest nieprawidłowa" };
      }).pipe(Effect.orElseSucceed(() => undefined)),
    );
