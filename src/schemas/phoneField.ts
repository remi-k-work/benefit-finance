// services, features, and other libraries
import { Schema } from "effect";
import { Field } from "@lucas-barake/effect-form-react";

// types
import type { Lang } from "@/lib/LangLoader";

// constants
const PHONE_REGEX = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;

export const PhoneField = <K extends string = "phone">(preferredLanguage: Lang = "en", key: K = "phone" as K, nonEmptyMessage?: string) =>
  preferredLanguage === "en"
    ? Field.makeField(
        key,
        Schema.Trim.pipe(
          Schema.nonEmptyString({
            message: () => nonEmptyMessage ?? "Please provide your phone number so we can contact you; the phone number is a required field",
          }),
          Schema.maxLength(11, { message: () => "The phone number must be at most 11 characters long" }),
          Schema.pattern(PHONE_REGEX, {
            message: () => "The phone number you entered does not appear to be valid; please use the following format: 333-444-444",
          }),
        ),
      )
    : Field.makeField(
        key,
        Schema.Trim.pipe(
          Schema.nonEmptyString({
            message: () => nonEmptyMessage ?? "Podaj swój numer telefonu, tak abyśmy mogli się z Tobą skontaktować; numer telefonu jest polem obowiązkowym",
          }),
          Schema.maxLength(11, { message: () => "Numer telefonu musi mieć maksymalnie 11 znaków" }),
          Schema.pattern(PHONE_REGEX, { message: () => "Podany numer telefonu wydaje się być nieprawidłowy; użyj następującego formatu: 333-444-444" }),
        ),
      );
