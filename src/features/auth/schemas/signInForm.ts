// services, features, and other libraries
import { FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailField, PasswordField } from "@/schemas";
import { RememberMeField } from "@/features/auth/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const signInFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty.addField(EmailField(preferredLanguage)).addField(PasswordField(preferredLanguage)).addField(RememberMeField);
