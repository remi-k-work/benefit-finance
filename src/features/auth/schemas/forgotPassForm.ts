// services, features, and other libraries
import { z } from "zod";

// schemas
import { EmailSchema } from "@/schemas/email";

export const ForgotPassFormSchema = z.object({ email: EmailSchema });
