// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, ValidationHasFailedError } from "@/lib/errors";

export class RpcAuth extends RpcGroup.make(
  Rpc.make("forgotPassForm", {
    error: Schema.Union(BetterAuthApiError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("resetPassForm", {
    error: Schema.Union(BetterAuthApiError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { token: Schema.String, formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("signInForm", {
    error: Schema.Union(BetterAuthApiError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("signUpForm", {
    error: Schema.Union(BetterAuthApiError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),
) {}
