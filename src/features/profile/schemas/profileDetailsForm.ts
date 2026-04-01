// services, features, and other libraries
import { FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { NameField } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const profileDetailsFormBuilder = (preferredLanguage: Lang) => FormBuilder.empty.addField(NameField(preferredLanguage));
