// services, features, and other libraries
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailSchemaEn2, EmailSchemaPl2 } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

const NewEmailField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("newEmail", EmailSchemaEn2) : Field.makeField("newEmail", EmailSchemaPl2);

export const emailChangeFormBuilder = (preferredLanguage: Lang) => FormBuilder.empty.addField(NewEmailField(preferredLanguage));
