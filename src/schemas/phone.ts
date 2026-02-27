// services, features, and other libraries
import { Schema } from "effect";

// constants
const PHONE_REGEX = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;

export const PhoneSchemaEn = (nonEmptyMessage?: string) =>
  Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => nonEmptyMessage ?? "Please provide your phone number so we can contact you; the phone number is a required field" }),
    Schema.maxLength(11, { message: () => "The phone number must be at most 11 characters long" }),
    Schema.pattern(PHONE_REGEX, { message: () => "The phone number you entered does not appear to be valid; please use the following format: xxx-xxx-xxx" }),
  );

export const PhoneSchemaPl = (nonEmptyMessage?: string) =>
  Schema.Trim.pipe(
    Schema.nonEmptyString({
      message: () => nonEmptyMessage ?? "Podaj swój numer telefonu, tak abyśmy mogli się z Tobą skontaktować; numer telefonu jest polem obowiązkowym",
    }),
    Schema.maxLength(11, { message: () => "Numer telefonu musi mieć maksymalnie 11 znaków" }),
    Schema.pattern(PHONE_REGEX, { message: () => "Podany numer telefonu wydaje się być nieprawidłowy; użyj następującego formatu: xxx-xxx-xxx" }),
  );
