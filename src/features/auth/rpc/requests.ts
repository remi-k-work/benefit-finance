// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError } from "@/lib/errors";

// schemas
import { EmailSchemaEn2, NameSchemaEn, PasswordSchemaEn2 } from "@/schemas";

export class RpcAuth extends RpcGroup.make(
  Rpc.make("forgotPassForm", {
    error: BetterAuthApiError,
    payload: { email: EmailSchemaEn2 },
  }),

  Rpc.make("resetPassForm", {
    error: BetterAuthApiError,
    payload: { token: Schema.Trim.pipe(Schema.nonEmptyString()), newPassword: PasswordSchemaEn2 },
  }),

  Rpc.make("signInForm", {
    error: BetterAuthApiError,
    payload: { email: EmailSchemaEn2, password: PasswordSchemaEn2, rememberMe: Schema.Boolean },
  }),

  Rpc.make("signUpForm", {
    error: BetterAuthApiError,
    payload: { name: NameSchemaEn, email: EmailSchemaEn2, password: PasswordSchemaEn2 },
  }),
) {}
