// services, features, and other libraries
import { Schema } from "effect";
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const TitleField = (preferredLanguage: Lang) =>
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
export const ContentField = (preferredLanguage: Lang) =>
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

export const newDocFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty.addField(TitleField(preferredLanguage)).addField(ContentField(preferredLanguage));
