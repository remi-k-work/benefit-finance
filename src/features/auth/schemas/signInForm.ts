// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchemaEn, EmailSchemaPl, PasswordSchemaEn, PasswordSchemaPl } from "@/schemas";

export const SignInFormSchemaEn = Schema.Struct({
  email: EmailSchemaEn,
  password: PasswordSchemaEn,
  rememberMe: Schema.optionalWith(Schema.BooleanFromUnknown, { default: () => false, exact: true }),
});

export const SignInFormSchemaPl = Schema.Struct({
  email: EmailSchemaPl,
  password: PasswordSchemaPl,
  rememberMe: Schema.optionalWith(Schema.BooleanFromUnknown, { default: () => false, exact: true }),
});
