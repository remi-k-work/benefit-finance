// drizzle and db access
import { serviceOfInterestEnum } from "@/drizzle/schema/lead";

// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchemaEn, EmailSchemaPl, FlexibleSelectSchema, FlexibleStringSchema, PhoneSchemaEn, PhoneSchemaPl } from "@/schemas";

export const NewLeadFormSchemaEn = Schema.Struct({
  firstName: FlexibleStringSchema.pipe(
    Schema.nonEmptyString({ message: () => "Please provide your lead's first name; this is a necessary field" }),
    Schema.maxLength(25, { message: () => "Please keep the lead's first name to a maximum of 25 characters" }),
  ),
  lastName: FlexibleStringSchema.pipe(
    Schema.nonEmptyString({ message: () => "Please provide your lead's last name; this is a necessary field" }),
    Schema.maxLength(25, { message: () => "Please keep the lead's last name to a maximum of 25 characters" }),
  ),
  email: EmailSchemaEn,
  phone: PhoneSchemaEn("Please provide your lead's phone number so we can contact them; the phone number is a required field"),
  serviceOfInterest: FlexibleSelectSchema(serviceOfInterestEnum.enumValues, "not sure"),
  mustConfirmDataSharing: Schema.optionalWith(Schema.BooleanFromUnknown.pipe(Schema.filter((b) => b === true, { message: () => "GDPR Consent is required" })), {
    default: () => false,
    exact: true,
  }),
  mustAcceptPartnershipTerms: Schema.optionalWith(
    Schema.BooleanFromUnknown.pipe(Schema.filter((b) => b === true, { message: () => "Please accept the Terms and Conditions of Partnership" })),
    { default: () => false, exact: true },
  ),
});

export const NewLeadFormSchemaPl = Schema.Struct({
  firstName: FlexibleStringSchema.pipe(
    Schema.nonEmptyString({ message: () => "Proszę podać imię leada; jest to pole obowiązkowe" }),
    Schema.maxLength(25, { message: () => "Imię leada powinno mieć maksymalnie 25 znaków" }),
  ),
  lastName: FlexibleStringSchema.pipe(
    Schema.nonEmptyString({ message: () => "Proszę podać nazwisko leada; jest to pole obowiązkowe" }),
    Schema.maxLength(25, { message: () => "Nazwisko leada powinno mieć maksymalnie 25 znaków" }),
  ),
  email: EmailSchemaPl,
  phone: PhoneSchemaPl("Proszę podać numer telefonu leada, tak abyśmy mogli się z nim skontaktować; numer telefonu jest polem obowiązkowym"),
  serviceOfInterest: FlexibleSelectSchema(serviceOfInterestEnum.enumValues, "not sure"),
  mustConfirmDataSharing: Schema.optionalWith(Schema.BooleanFromUnknown.pipe(Schema.filter((b) => b === true, { message: () => "Zgoda RODO jest wymagana" })), {
    default: () => false,
    exact: true,
  }),
  mustAcceptPartnershipTerms: Schema.optionalWith(
    Schema.BooleanFromUnknown.pipe(Schema.filter((b) => b === true, { message: () => "Proszę zaakceptować Regulamin Współpracy Partnerskiej" })),
    { default: () => false, exact: true },
  ),
});
