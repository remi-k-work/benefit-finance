// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const FirstNameField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField(
        "firstName",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Please provide your lead's first name; this is a necessary field" }),
          Schema.maxLength(25, { message: () => "Please keep the lead's first name to a maximum of 25 characters" }),
        ),
      )
    : Field.makeField(
        "firstName",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Proszę podać imię leada; jest to pole obowiązkowe" }),
          Schema.maxLength(25, { message: () => "Imię leada powinno mieć maksymalnie 25 znaków" }),
        ),
      );
