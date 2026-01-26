// services, features, and other libraries
import { Schema } from "effect";

// schemas
import { EmailSchema } from "@/schemas/email";

export const ForgotPassFormSchema = Schema.Struct({ email: EmailSchema });
