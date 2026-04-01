// services, features, and other libraries
import { FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { PasswordField } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const resetPassFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty
    .addField(PasswordField(preferredLanguage, "newPassword"))
    .addField(PasswordField(preferredLanguage, "confirmPassword"))
    .refine(({ newPassword, confirmPassword }) => {
      if (newPassword !== confirmPassword) {
        return { path: ["confirmPassword"], message: preferredLanguage === "en" ? "Passwords do not match" : "Hasła nie pasują" };
      }
    });
