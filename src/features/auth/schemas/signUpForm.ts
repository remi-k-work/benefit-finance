// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchema } from "@/schemas/email";
import { PasswordSchema } from "@/schemas/password";

export const SignUpFormSchema = Schema.Struct({
  name: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Please provide your name; this is a necessary field" }),
    Schema.maxLength(25, { message: () => "Please keep the name to a maximum of 25 characters" }),
  ),
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
}).pipe(
  // Add a filter to ensure that passwords match
  Schema.filter(({ password, confirmPassword }) => {
    if (password !== confirmPassword) return { path: ["confirmPassword"], message: "Passwords do not match" };
  }),
);
