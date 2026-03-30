// services, features, and other libraries
import { Schema } from "effect";
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

const InternalNotesField = (preferredLanguage: Lang) =>
  preferredLanguage === "en"
    ? Field.makeField("internalNotes", Schema.Trim.pipe(Schema.maxLength(2048, { message: () => "Please keep the notes to a maximum of 2048 characters" })))
    : Field.makeField("internalNotes", Schema.Trim.pipe(Schema.maxLength(2048, { message: () => "Proszę ograniczyć notatki do maksymalnie 2048 znaków" })));

export const editLeadNotesFormBuilder = (preferredLanguage: Lang) => FormBuilder.empty.addField(InternalNotesField(preferredLanguage));
