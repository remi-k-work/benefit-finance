// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const CaptchaInputField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField(
        "captchaInput",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "A captcha is required to proceed" }),
          Schema.maxLength(6, { message: () => "The captcha is no more than six characters long" }),
        ),
      )
    : Field.makeField(
        "captchaInput",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Captcha jest wymagane aby kontynuować" }),
          Schema.maxLength(6, { message: () => "Captcha musi być nie dłuższe niż 6 znaków" }),
        ),
      );
