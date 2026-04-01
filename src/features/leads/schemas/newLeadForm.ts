// services, features, and other libraries
import { FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailField, PhoneField } from "@/schemas";
import { FirstNameField, LastNameField, MustAcceptPartnershipTermsField, MustConfirmDataSharingField, ServiceOfInterestField } from "@/features/leads/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

export const newLeadFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty
    .addField(FirstNameField(preferredLanguage))
    .addField(LastNameField(preferredLanguage))
    .addField(EmailField(preferredLanguage))
    .addField(
      PhoneField(
        preferredLanguage,
        "phone",
        preferredLanguage === "en"
          ? "Please provide your lead's phone number so we can contact them; the phone number is a required field"
          : "Proszę podać numer telefonu leada, tak abyśmy mogli się z nim skontaktować; numer telefonu jest polem obowiązkowym",
      ),
    )
    .addField(ServiceOfInterestField)
    .addField(MustConfirmDataSharingField(preferredLanguage))
    .addField(MustAcceptPartnershipTermsField(preferredLanguage));
