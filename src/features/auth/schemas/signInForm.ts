// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchema } from "@/schemas/email";
import { PasswordSchema } from "@/schemas/password";

export const SignInFormSchema = Schema.Struct({
  email: EmailSchema,
  password: PasswordSchema,
  rememberMe: Schema.optionalWith(Schema.BooleanFromString, { default: () => false }),
});
