// services, features, and other libraries
import { Schema } from "effect";

export const NewDocFormSchemaEn = Schema.Struct({
  title: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Please provide the document title; this is a necessary field" }),
    Schema.maxLength(50, { message: () => "Please keep the title to a maximum of 50 characters" }),
  ),
  content: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "What is the content of the document? This is a mandatory field" }),
    Schema.maxLength(2048, { message: () => "Please keep the content to a maximum of 2048 characters" }),
  ),
  markdown: Schema.optional(Schema.Trim.pipe(Schema.nonEmptyString())),
});

export const NewDocFormSchemaPl = Schema.Struct({
  title: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Proszę podać tytuł dokumentu, jest to pole obowiązkowe" }),
    Schema.maxLength(50, { message: () => "Proszę zachować tytuł o maksymalnej długości 50 znaków" }),
  ),
  content: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Jaka jest treść dokumentu? To pole jest obowiązkowe" }),
    Schema.maxLength(2048, { message: () => "Proszę ograniczyć treść do maksymalnie 2048 znaków" }),
  ),
  markdown: Schema.optional(Schema.Trim.pipe(Schema.nonEmptyString())),
});
