// services, features, and other libraries
import { Schema } from "effect";

// constants
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const EmailSchema = Schema.Trim.pipe(
  Schema.nonEmptyString({ message: () => "Email address is required" }),
  Schema.pattern(EMAIL_REGEX, { message: () => "The email address you gave appears to be incorrect; please update it" }),
);
