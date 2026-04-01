// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const ContentField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField(
        "content",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "What is the content of the document? This is a mandatory field" }),
          Schema.maxLength(2048, { message: () => "Please keep the content to a maximum of 2048 characters" }),
        ),
      )
    : Field.makeField(
        "content",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Jaka jest treść dokumentu? To pole jest obowiązkowe" }),
          Schema.maxLength(2048, { message: () => "Proszę ograniczyć treść do maksymalnie 2048 znaków" }),
        ),
      );
