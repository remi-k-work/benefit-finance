// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchemaEn, EmailSchemaPl } from "@/schemas/email";

export const ForgotPassFormSchemaEn = Schema.Struct({ email: EmailSchemaEn });
export const ForgotPassFormSchemaPl = Schema.Struct({ email: EmailSchemaPl });
