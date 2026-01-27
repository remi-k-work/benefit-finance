// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { PasswordSchemaEn, PasswordSchemaPl } from "@/schemas/password";

export const PassChangeFormSchemaEn = Schema.Struct({
  currentPassword: PasswordSchemaEn,
  newPassword: PasswordSchemaEn,
  confirmPassword: PasswordSchemaEn,
}).pipe(
  // Add a filter to ensure that passwords match
  Schema.filter(({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) return { path: ["confirmPassword"], message: "Passwords do not match" };
  }),
);

export const PassSetupFormSchemaEn = Schema.Struct({
  newPassword: PasswordSchemaEn,
  confirmPassword: PasswordSchemaEn,
}).pipe(
  // Add a filter to ensure that passwords match
  Schema.filter(({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) return { path: ["confirmPassword"], message: "Passwords do not match" };
  }),
);

export const PassChangeFormSchemaPl = Schema.Struct({
  currentPassword: PasswordSchemaPl,
  newPassword: PasswordSchemaPl,
  confirmPassword: PasswordSchemaPl,
}).pipe(
  // Add a filter to ensure that passwords match
  Schema.filter(({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) return { path: ["confirmPassword"], message: "Hasła nie pasują" };
  }),
);

export const PassSetupFormSchemaPl = Schema.Struct({
  newPassword: PasswordSchemaPl,
  confirmPassword: PasswordSchemaPl,
}).pipe(
  // Add a filter to ensure that passwords match
  Schema.filter(({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) return { path: ["confirmPassword"], message: "Hasła nie pasują" };
  }),
);
