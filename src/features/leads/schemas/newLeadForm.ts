// drizzle and db access
import { serviceOfInterestEnum } from "@/drizzle/schema/lead";

// services, features, and other libraries
import { Schema } from "effect";
import { Field, FormBuilder } from "@lucas-barake/effect-form-react";

// schemas
import { EmailSchemaEn2, EmailSchemaPl2, PhoneSchemaEn2, PhoneSchemaPl2 } from "@/schemas";

// types
import type { Lang } from "@/lib/LangLoader";

const FirstNameField = (preferredLanguage: Lang) =>
  preferredLanguage === "en"
    ? Field.makeField(
        "firstName",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Please provide your lead's first name; this is a necessary field" }),
          Schema.maxLength(25, { message: () => "Please keep the lead's first name to a maximum of 25 characters" }),
        ),
      )
    : Field.makeField(
        "firstName",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Proszę podać imię leada; jest to pole obowiązkowe" }),
          Schema.maxLength(25, { message: () => "Imię leada powinno mieć maksymalnie 25 znaków" }),
        ),
      );
const LastNameField = (preferredLanguage: Lang) =>
  preferredLanguage === "en"
    ? Field.makeField(
        "lastName",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Please provide your lead's last name; this is a necessary field" }),
          Schema.maxLength(25, { message: () => "Please keep the lead's last name to a maximum of 25 characters" }),
        ),
      )
    : Field.makeField(
        "lastName",
        Schema.Trim.pipe(
          Schema.nonEmptyString({ message: () => "Proszę podać nazwisko leada; jest to pole obowiązkowe" }),
          Schema.maxLength(25, { message: () => "Nazwisko leada powinno mieć maksymalnie 25 znaków" }),
        ),
      );
const EmailField = (preferredLanguage: Lang) =>
  preferredLanguage === "en" ? Field.makeField("email", EmailSchemaEn2) : Field.makeField("email", EmailSchemaPl2);
const PhoneField = (preferredLanguage: Lang) =>
  preferredLanguage === "en"
    ? Field.makeField("phone", PhoneSchemaEn2("Please provide your lead's phone number so we can contact them; the phone number is a required field"))
    : Field.makeField(
        "phone",
        PhoneSchemaPl2("Proszę podać numer telefonu leada, tak abyśmy mogli się z nim skontaktować; numer telefonu jest polem obowiązkowym"),
      );
const ServiceOfInterestField = Field.makeField("serviceOfInterest", Schema.Literal(...serviceOfInterestEnum.enumValues));
const MustConfirmDataSharingField = (preferredLanguage: Lang) =>
  preferredLanguage === "en"
    ? Field.makeField("mustConfirmDataSharing", Schema.Boolean.pipe(Schema.filter((b) => b === true, { message: () => "GDPR Consent is required" })))
    : Field.makeField("mustConfirmDataSharing", Schema.Boolean.pipe(Schema.filter((b) => b === true, { message: () => "Zgoda RODO jest wymagana" })));
const MustAcceptPartnershipTermsField = (preferredLanguage: Lang) =>
  preferredLanguage === "en"
    ? Field.makeField(
        "mustAcceptPartnershipTerms",
        Schema.Boolean.pipe(Schema.filter((b) => b === true, { message: () => "Please accept the Terms and Conditions of Partnership" })),
      )
    : Field.makeField(
        "mustAcceptPartnershipTerms",
        Schema.Boolean.pipe(Schema.filter((b) => b === true, { message: () => "Proszę zaakceptować Regulamin Współpracy Partnerskiej" })),
      );

export const newLeadFormBuilder = (preferredLanguage: Lang) =>
  FormBuilder.empty
    .addField(FirstNameField(preferredLanguage))
    .addField(LastNameField(preferredLanguage))
    .addField(EmailField(preferredLanguage))
    .addField(PhoneField(preferredLanguage))
    .addField(ServiceOfInterestField)
    .addField(MustConfirmDataSharingField(preferredLanguage))
    .addField(MustAcceptPartnershipTermsField(preferredLanguage));
