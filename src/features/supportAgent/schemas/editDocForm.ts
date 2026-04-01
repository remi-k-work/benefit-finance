// services, features, and other libraries
import { FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { ContentField, TitleField } from "@/features/supportAgent/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const editDocFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty.addField(TitleField(preferredLanguage)).addField(ContentField(preferredLanguage));
