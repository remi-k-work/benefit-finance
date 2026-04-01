// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

// constants
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const EmailField = <K extends string = "email">(preferredLanguage: Lang = "en", key: K = "email" as K) =>
  preferredLanguage === "en"
    ? Field.makeField(
        key,
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Email address is required" }),
          Schema.pattern(EMAIL_REGEX, { message: () => "The email address you gave appears to be incorrect; please update it" }),
        ),
      )
    : Field.makeField(
        key,
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Adres e-mail jest wymagany" }),
          Schema.pattern(EMAIL_REGEX, { message: () => "Podany adres e-mail wydaje się być niepoprawny. Proszę go zaktualizować" }),
        ),
      );
