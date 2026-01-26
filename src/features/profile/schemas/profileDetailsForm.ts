// services, features, and other libraries
import { Schema } from "effect";

export const ProfileDetailsFormSchema = Schema.Struct({
  name: Schema.Trim.pipe(
    Schema.nonEmptyString({ message: () => "Please provide your name; this is a necessary field" }),
    Schema.maxLength(25, { message: () => "Please keep the name to a maximum of 25 characters" }),
  ),
});
