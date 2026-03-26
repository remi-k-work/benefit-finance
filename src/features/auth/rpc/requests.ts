// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, ValidationHasFailedError } from "@/lib/errors";

// schemas
import { EmailSchemaEn2, PasswordSchemaEn2 } from "@/schemas";
import { NameSchemaEn } from "@/features/auth/schemas";

export class RpcAuth extends RpcGroup.make(
  Rpc.make("forgotPassForm", {
    error: Schema.Union(BetterAuthApiError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
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
