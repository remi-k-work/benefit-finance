// services, features, and other libraries
import { Schema } from "effect";

export const PasswordSchema = Schema.Trim.pipe(
  Schema.minLength(8, { message: () => "The password must be at least 8 characters long" }),
  Schema.maxLength(128, { message: () => "The password must be at most 128 characters long" }),
  Schema.pattern(/[^A-Za-z0-9]/, { message: () => "The password must contain at least one special character" }),
);
