// drizzle and db access
import { serviceOfInterestEnum } from "@/drizzle/schema/lead";

// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchemaEn, EmailSchemaPl } from "@/schemas/email";
import { PhoneSchemaEn, PhoneSchemaPl } from "@/schemas/phone";

export const NewLeadFormSchemaEn = Schema.Struct({
  firstName: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Please provide your lead's first name; this is a necessary field" }),
    Schema.maxLength(25, { message: () => "Please keep the lead's first name to a maximum of 25 characters" }),
  ),
  lastName: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Please provide your lead's last name; this is a necessary field" }),
    Schema.maxLength(25, { message: () => "Please keep the lead's last name to a maximum of 25 characters" }),
  ),
  email: EmailSchemaEn,
  phone: PhoneSchemaEn("Please provide your lead's phone number so we can contact them; the phone number is a required field"),
  serviceOfInterest: Schema.Literal(...serviceOfInterestEnum.enumValues),
  mustConfirmDataSharing: Schema.optionalWith(Schema.BooleanFromString.pipe(Schema.filter((b) => b === true, { message: () => "GDPR Consent is required" })), {
    default: () => false,
  }),
  mustAcceptPartnershipTerms: Schema.optionalWith(
    Schema.BooleanFromString.pipe(Schema.filter((b) => b === true, { message: () => "Please accept the Terms and Conditions of Partnership" })),
    { default: () => false },
  ),
});

export const NewLeadFormSchemaPl = Schema.Struct({
  firstName: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Proszę podać imię leada; jest to pole obowiązkowe" }),
    Schema.maxLength(25, { message: () => "Imię leada powinno mieć maksymalnie 25 znaków" }),
  ),
  lastName: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Proszę podać nazwisko leada; jest to pole obowiązkowe" }),
    Schema.maxLength(25, { message: () => "Nazwisko leada powinno mieć maksymalnie 25 znaków" }),
  ),
  email: EmailSchemaPl,
  phone: PhoneSchemaPl("Proszę podać numer telefonu leada, tak abyśmy mogli się z nim skontaktować; numer telefonu jest polem obowiązkowym"),
  serviceOfInterest: Schema.Literal(...serviceOfInterestEnum.enumValues),
  mustConfirmDataSharing: Schema.optionalWith(Schema.BooleanFromString.pipe(Schema.filter((b) => b === true, { message: () => "Zgoda RODO jest wymagana" })), {
    default: () => false,
  }),
  mustAcceptPartnershipTerms: Schema.optionalWith(
    Schema.BooleanFromString.pipe(Schema.filter((b) => b === true, { message: () => "Proszę zaakceptować Regulamin Współpracy Partnerskiej" })),
    { default: () => false },
  ),
});
