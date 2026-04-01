// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

export const MustAcceptPartnershipTermsField = (preferredLanguage: Lang = "en") =>
  preferredLanguage === "en"
    ? Field.makeField(
        "mustAcceptPartnershipTerms",
        Schema.Boolean.pipe(Schema.filter((b) => b === true, { message: () => "Please accept the Terms and Conditions of Partnership" })),
      )
    : Field.makeField(
        "mustAcceptPartnershipTerms",
        Schema.Boolean.pipe(Schema.filter((b) => b === true, { message: () => "Proszę zaakceptować Regulamin Współpracy Partnerskiej" })),
      );
