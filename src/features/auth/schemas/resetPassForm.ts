// services, features, and other libraries
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { PasswordSchemaEn2, PasswordSchemaPl2 } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

const NewPasswordField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("newPassword", PasswordSchemaEn2) : Field.makeField("newPassword", PasswordSchemaPl2);
const ConfirmPasswordField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("confirmPassword", PasswordSchemaEn2) : Field.makeField("confirmPassword", PasswordSchemaPl2);

export const resetPassFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty
    .addField(NewPasswordField(preferredLanguage))
    .addField(ConfirmPasswordField(preferredLanguage))
    .refine(({ newPassword, confirmPassword }) => {
      if (newPassword !== confirmPassword) {
        return { path: ["confirmPassword"], message: preferredLanguage === "en" ? "Passwords do not match" : "Hasła nie pasują" };
      }
    });
