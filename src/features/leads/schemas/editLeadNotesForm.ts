// services, features, and other libraries
import { Schema } from "effect";

export const EditLeadNotesFormSchemaEn = Schema.Struct({
  internalNotes: Schema.optional(Schema.Trim.pipe(Schema.maxLength(2048, { message: () => "Please keep the notes to a maximum of 2048 characters" }))),
});

export const EditLeadNotesFormSchemaPl = Schema.Struct({
  internalNotes: Schema.optional(Schema.Trim.pipe(Schema.maxLength(2048, { message: () => "Proszę ograniczyć notatki do maksymalnie 2048 znaków" }))),
});
