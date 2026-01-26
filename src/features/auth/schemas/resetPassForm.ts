// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { PasswordSchema } from "@/schemas/password";

export const ResetPassFormSchema = Schema.Struct({
  newPassword: PasswordSchema,
  confirmPassword: PasswordSchema,
}).pipe(
  // Add a filter to ensure that passwords match
  Schema.filter(({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) return { path: ["confirmPassword"], message: "Passwords do not match" };
  }),
);
