// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchemaEn, EmailSchemaPl } from "@/schemas/email";
import { PasswordSchemaEn, PasswordSchemaPl } from "@/schemas/password";

export const SignUpFormSchemaEn = Schema.Struct({
  name: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Please provide your name; this is a necessary field" }),
    Schema.maxLength(25, { message: () => "Please keep the name to a maximum of 25 characters" }),
  ),
  email: EmailSchemaEn,
  password: PasswordSchemaEn,
  confirmPassword: PasswordSchemaEn,
}).pipe(
  // Add a filter to ensure that passwords match
  Schema.filter(({ password, confirmPassword }) => {
    if (password !== confirmPassword) return { path: ["confirmPassword"], message: "Passwords do not match" };
  }),
);

export const SignUpFormSchemaPl = Schema.Struct({
  name: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Proszę podać swoje imię; jest to pole obowiązkowe" }),
    Schema.maxLength(25, { message: () => "Imię powinno mieć maksymalnie 25 znaków" }),
  ),
  email: EmailSchemaPl,
  password: PasswordSchemaPl,
  confirmPassword: PasswordSchemaPl,
}).pipe(
  // Add a filter to ensure that passwords match
  Schema.filter(({ password, confirmPassword }) => {
    if (password !== confirmPassword) return { path: ["confirmPassword"], message: "Hasła nie pasują" };
  }),
);
