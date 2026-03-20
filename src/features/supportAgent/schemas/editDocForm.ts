// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { FlexibleStringSchema } from "@/schemas";

export const EditDocFormSchemaEn = Schema.Struct({
  title: FlexibleStringSchema.pipe(
    Schema.nonEmptyString({ message: () => "Please provide the document title; this is a necessary field" }),
    Schema.maxLength(50, { message: () => "Please keep the title to a maximum of 50 characters" }),
  ),
  content: FlexibleStringSchema.pipe(
    Schema.nonEmptyString({ message: () => "What is the content of the document? This is a mandatory field" }),
    Schema.maxLength(2048, { message: () => "Please keep the content to a maximum of 2048 characters" }),
  ),
  markdown: Schema.optional(FlexibleStringSchema.pipe(Schema.nonEmptyString())),
});

export const EditDocFormSchemaPl = Schema.Struct({
  title: FlexibleStringSchema.pipe(
    Schema.nonEmptyString({ message: () => "Proszę podać tytuł dokumentu, jest to pole obowiązkowe" }),
    Schema.maxLength(50, { message: () => "Proszę zachować tytuł o maksymalnej długości 50 znaków" }),
  ),
  content: FlexibleStringSchema.pipe(
    Schema.nonEmptyString({ message: () => "Jaka jest treść dokumentu? To pole jest obowiązkowe" }),
    Schema.maxLength(2048, { message: () => "Proszę ograniczyć treść do maksymalnie 2048 znaków" }),
  ),
  markdown: Schema.optional(FlexibleStringSchema.pipe(Schema.nonEmptyString())),
});
