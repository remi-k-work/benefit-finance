// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, UnauthorizedAccessError } from "@/lib/errors";

export class RpcUsers extends RpcGroup.make(
  Rpc.make("setUserRole", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { userId: Schema.String, newRole: Schema.Literal("user", "admin", "demo") },
  }),

  Rpc.make("deleteUser", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { userId: Schema.String },
  }),
) {}
