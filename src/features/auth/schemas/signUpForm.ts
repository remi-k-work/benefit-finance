// services, features, and other libraries
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailSchemaEn2, EmailSchemaPl2, NameSchemaEn, NameSchemaPl, PasswordSchemaEn2, PasswordSchemaPl2 } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

const NameField = (preferredLanguage: Lang) => (preferredLanguage === "en" ? Field.makeField("name", NameSchemaEn) : Field.makeField("name", NameSchemaPl));
const EmailField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("email", EmailSchemaEn2) : Field.makeField("email", EmailSchemaPl2);
const PasswordField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("password", PasswordSchemaEn2) : Field.makeField("password", PasswordSchemaPl2);
const ConfirmPasswordField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("confirmPassword", PasswordSchemaEn2) : Field.makeField("confirmPassword", PasswordSchemaPl2);

export const signUpFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty
    .addField(NameField(preferredLanguage))
    .addField(EmailField(preferredLanguage))
    .addField(PasswordField(preferredLanguage))
    .addField(ConfirmPasswordField(preferredLanguage))
    .refine(({ password, confirmPassword }) => {
      if (password !== confirmPassword) {
        return { path: ["confirmPassword"], message: preferredLanguage === "en" ? "Passwords do not match" : "Hasła nie pasują" };
      }
    });
