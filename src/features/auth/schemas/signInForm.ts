// services, features, and other libraries
import { Schema } from "effect";
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailSchemaEn2, EmailSchemaPl2, PasswordSchemaEn2, PasswordSchemaPl2 } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

const EmailField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("email", EmailSchemaEn2) : Field.makeField("email", EmailSchemaPl2);
const PasswordField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("password", PasswordSchemaEn2) : Field.makeField("password", PasswordSchemaPl2);
const RememberMeField = Field.makeField("rememberMe", Schema.Boolean);

export const signInFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty.addField(EmailField(preferredLanguage)).addField(PasswordField(preferredLanguage)).addField(RememberMeField);
