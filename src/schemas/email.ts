// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { FlexibleStringSchema } from "@/schemas";

// constants
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const EmailSchemaEn = FlexibleStringSchema.pipe(
  Schema.nonEmptyString({ message: () => "Email address is required" }),
  Schema.pattern(EMAIL_REGEX, { message: () => "The email address you gave appears to be incorrect; please update it" }),
);

export const EmailSchemaPl = FlexibleStringSchema.pipe(
  Schema.nonEmptyString({ message: () => "Adres e-mail jest wymagany" }),
  Schema.pattern(EMAIL_REGEX, { message: () => "Podany adres e-mail wydaje się być niepoprawny. Proszę go zaktualizować" }),
);
