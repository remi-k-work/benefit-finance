// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, DatabaseError, UnauthorizedAccessError, UtApiError, ValidationHasFailedError } from "@/lib/errors";

export class RpcProfile extends RpcGroup.make(
  Rpc.make("deleteAvatar", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError, UtApiError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
  }),

  Rpc.make("emailChangeForm", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("passChangeForm", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { hasCredential: Schema.Boolean, formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("profileDetailsForm", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("signOutEverywhere", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
  }),
) {}
