// services, features, and other libraries
import { Schema } from "effect";

export const NameSchemaEn = Schema.Trim.pipe(
  Schema.nonEmptyString({ message: () => "Please provide your name; this is a necessary field" }),
  Schema.maxLength(25, { message: () => "Please keep the name to a maximum of 25 characters" }),
);

export const NameSchemaPl = Schema.Trim.pipe(
  Schema.nonEmptyString({ message: () => "Proszę podać swoje imię; jest to pole obowiązkowe" }),
  Schema.maxLength(25, { message: () => "Imię powinno mieć maksymalnie 25 znaków" }),
);
