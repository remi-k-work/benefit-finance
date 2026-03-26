// services, features, and other libraries
import { Schema } from "effect";
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import {
  EmailSchemaEn,
  EmailSchemaEn2,
  EmailSchemaPl,
  EmailSchemaPl2,
  PasswordSchemaEn,
  PasswordSchemaEn2,
  PasswordSchemaPl,
  PasswordSchemaPl2,
} from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

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

const EmailField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("email", EmailSchemaEn2) : Field.makeField("email", EmailSchemaPl2);
const PasswordField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("password", PasswordSchemaEn2) : Field.makeField("password", PasswordSchemaPl2);
const RememberMeField = Field.makeField("rememberMe", Schema.Boolean);

export const formBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty.addField(EmailField(preferredLanguage)).addField(PasswordField(preferredLanguage)).addField(RememberMeField);
