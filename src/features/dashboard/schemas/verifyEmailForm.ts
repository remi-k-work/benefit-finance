// services, features, and other libraries
import { FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailField } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const verifyEmailFormBuilder = (preferredLanguage: Lang) => FormBuilder.empty.addField(EmailField(preferredLanguage));
