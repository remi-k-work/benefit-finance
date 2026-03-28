// services, features, and other libraries
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { NameSchemaEn, NameSchemaPl } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

const NameField = (preferredLanguage: Lang) => (preferredLanguage === "en" ? Field.makeField("name", NameSchemaEn) : Field.makeField("name", NameSchemaPl));

export const profileDetailsFormBuilder = (preferredLanguage: Lang) => FormBuilder.empty.addField(NameField(preferredLanguage));
