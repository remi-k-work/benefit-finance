// services, features, and other libraries
import { FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailField, NameField, PasswordField } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const signUpFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty
    .addField(NameField(preferredLanguage))
    .addField(EmailField(preferredLanguage))
    .addField(PasswordField(preferredLanguage))
    .addField(PasswordField(preferredLanguage, "confirmPassword"))
    .refine(({ password, confirmPassword }) => {
      if (password !== confirmPassword) {
        return { path: ["confirmPassword"], message: preferredLanguage === "en" ? "Passwords do not match" : "Hasła nie pasują" };
      }
    });
