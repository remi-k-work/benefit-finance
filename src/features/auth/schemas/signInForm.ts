// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchemaEn, EmailSchemaPl } from "@/schemas/email";
import { PasswordSchemaEn, PasswordSchemaPl } from "@/schemas/password";

export const SignInFormSchemaEn = Schema.Struct({
  email: EmailSchemaEn,
  password: PasswordSchemaEn,
  rememberMe: Schema.optionalWith(Schema.BooleanFromString, { default: () => false }),
});

export const SignInFormSchemaPl = Schema.Struct({
  email: EmailSchemaPl,
  password: PasswordSchemaPl,
  rememberMe: Schema.optionalWith(Schema.BooleanFromString, { default: () => false }),
});
