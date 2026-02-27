// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchemaEn, EmailSchemaPl } from "@/schemas/email";
import { PhoneSchemaEn, PhoneSchemaPl } from "@/schemas/phone";

export const ContactUsFormSchemaEn = Schema.Struct({
  name: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Please provide your name; this is a necessary field" }),
    Schema.maxLength(25, { message: () => "Please keep the name to a maximum of 25 characters" }),
  ),
  email: EmailSchemaEn,
  subject: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Your message's subject is a required field" }),
    Schema.maxLength(40, { message: () => "Please keep the subject to a maximum of 40 characters" }),
  ),
  phone: PhoneSchemaEn(),
  message: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "What is the message you want to send? This is a mandatory field" }),
    Schema.maxLength(2048, { message: () => "Please keep the message to a maximum of 2048 characters" }),
  ),
  captcha: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "A captcha is required to proceed" }),
    Schema.maxLength(6, { message: () => "The captcha is no more than six characters long" }),
  ),
});

export const ContactUsFormSchemaPl = Schema.Struct({
  name: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Proszę podać swoje imię; jest to pole obowiązkowe" }),
    Schema.maxLength(25, { message: () => "Imię powinno mieć maksymalnie 25 znaków" }),
  ),
  email: EmailSchemaPl,
  subject: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Temat Twojej wiadomości jest polem wymaganym" }),
    Schema.maxLength(40, { message: () => "Temat wiadomości powinien mieć maksymalnie 40 znaków" }),
  ),
  phone: PhoneSchemaPl(),
  message: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Jaką wiadomość chcesz wysłać? Jest to pole obowiązkowe" }),
    Schema.maxLength(2048, { message: () => "Wiadomość nie może mieć więcej niż 2048 znaków" }),
  ),
  captcha: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Captcha jest wymagane aby kontynuować" }),
    Schema.maxLength(6, { message: () => "Captcha musi być nie dłuższe niż 6 znaków" }),
  ),
});
