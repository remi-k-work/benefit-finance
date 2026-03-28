// services, features, and other libraries
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailSchemaEn2, EmailSchemaPl2 } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

const EmailField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("email", EmailSchemaEn2) : Field.makeField("email", EmailSchemaPl2);

export const verifyEmailFormBuilder = (preferredLanguage: Lang) => FormBuilder.empty.addField(EmailField(preferredLanguage));
