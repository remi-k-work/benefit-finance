// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const MustConfirmDataSharingField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField("mustConfirmDataSharing", Schema.Boolean.pipe(Schema.filter((b) => b === true, { message: () => "GDPR Consent is required" })))
    : Field.makeField("mustConfirmDataSharing", Schema.Boolean.pipe(Schema.filter((b) => b === true, { message: () => "Zgoda RODO jest wymagana" })));
