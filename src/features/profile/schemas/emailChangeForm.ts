// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchemaEn, EmailSchemaPl } from "@/schemas/email";

export const EmailChangeFormSchemaEn = Schema.Struct({ newEmail: EmailSchemaEn });
export const EmailChangeFormSchemaPl = Schema.Struct({ newEmail: EmailSchemaPl });
