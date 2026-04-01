// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const NameField = <K extends string = "name">(preferredLanguage: Lang = "en", key: K = "name" as K) =>
  preferredLanguage === "en"
    ? Field.makeField(
        key,
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Please provide your name; this is a necessary field" }),
          Schema.maxLength(25, { message: () => "Please keep the name to a maximum of 25 characters" }),
        ),
      )
    : Field.makeField(
        key,
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Proszę podać swoje imię; jest to pole obowiązkowe" }),
          Schema.maxLength(25, { message: () => "Imię powinno mieć maksymalnie 25 znaków" }),
        ),
      );
