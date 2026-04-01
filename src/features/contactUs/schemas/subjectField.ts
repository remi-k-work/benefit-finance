// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const SubjectField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField(
        "subject",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Your message's subject is a required field" }),
          Schema.maxLength(40, { message: () => "Please keep the subject to a maximum of 40 characters" }),
        ),
      )
    : Field.makeField(
        "subject",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Temat Twojej wiadomości jest polem wymaganym" }),
          Schema.maxLength(40, { message: () => "Temat wiadomości powinien mieć maksymalnie 40 znaków" }),
        ),
      );
