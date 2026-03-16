// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { AiSdkError, BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError } from "@/lib/errors";

export class RpcSupportAgent extends RpcGroup.make(
  Rpc.make("newDocForm", {
    error: Schema.Union(AiSdkError, BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("editDocForm", {
    error: Schema.Union(AiSdkError, BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { docId: Schema.UUID, formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("deleteDoc", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { docId: Schema.UUID },
  }),
) {}
