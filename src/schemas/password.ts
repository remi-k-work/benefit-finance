// services, features, and other libraries
import { Schema } from "effect";

export const PasswordSchemaEn = Schema.Trim.pipe(
  Schema.minLength(8, { message: () => "The password must be at least 8 characters long" }),
  Schema.maxLength(128, { message: () => "The password must be at most 128 characters long" }),
  Schema.pattern(/[^A-Za-z0-9]/, { message: () => "The password must contain at least one special character" }),
);

export const PasswordSchemaPl = Schema.Trim.pipe(
  Schema.minLength(8, { message: () => "Hasło musi mieć co najmniej 8 znaków" }),
  Schema.maxLength(128, { message: () => "Hasło musi mieć maksymalnie 128 znaków" }),
  Schema.pattern(/[^A-Za-z0-9]/, { message: () => "Hasło musi zawierać co najmniej jeden znak specjalny" }),
);
