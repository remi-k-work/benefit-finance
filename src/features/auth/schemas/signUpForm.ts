// services, features, and other libraries
import { Schema } from "effect";
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailSchemaEn2, EmailSchemaPl2, PasswordSchemaEn2, PasswordSchemaPl2 } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const NameSchemaEn = Schema.Trim.pipe(
  Schema.nonEmptyString({ message: () => "Please provide your name; this is a necessary field" }),
  Schema.maxLength(25, { message: () => "Please keep the name to a maximum of 25 characters" }),
);

export const NameSchemaPl = Schema.Trim.pipe(
  Schema.nonEmptyString({ message: () => "Proszę podać swoje imię; jest to pole obowiązkowe" }),
  Schema.maxLength(25, { message: () => "Imię powinno mieć maksymalnie 25 znaków" }),
);

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
