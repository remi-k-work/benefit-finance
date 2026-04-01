// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const LastNameField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField(
        "lastName",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Please provide your lead's last name; this is a necessary field" }),
          Schema.maxLength(25, { message: () => "Please keep the lead's last name to a maximum of 25 characters" }),
        ),
      )
    : Field.makeField(
        "lastName",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Proszę podać nazwisko leada; jest to pole obowiązkowe" }),
          Schema.maxLength(25, { message: () => "Nazwisko leada powinno mieć maksymalnie 25 znaków" }),
        ),
      );
