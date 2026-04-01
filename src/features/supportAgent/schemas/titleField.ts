// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const TitleField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField(
        "title",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Please provide the document title; this is a necessary field" }),
          Schema.maxLength(50, { message: () => "Please keep the title to a maximum of 50 characters" }),
        ),
      )
    : Field.makeField(
        "title",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Proszę podać tytuł dokumentu, jest to pole obowiązkowe" }),
          Schema.maxLength(50, { message: () => "Proszę zachować tytuł o maksymalnej długości 50 znaków" }),
        ),
      );
