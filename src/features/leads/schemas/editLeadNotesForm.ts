// services, features, and other libraries
import { FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { InternalNotesField } from "@/features/leads/schemas/internalNotesField";

// types
import type { Lang } from "@/lib/LangLoader";

export const editLeadNotesFormBuilder = (preferredLanguage: Lang) => FormBuilder.empty.addField(InternalNotesField(preferredLanguage));
