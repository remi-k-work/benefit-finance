// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, UnauthorizedAccessError } from "@/lib/errors";

export class RpcUsers extends RpcGroup.make(
  Rpc.make("setUserRole", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    payload: { userId: Schema.String, newRole: Schema.Literal("user", "admin", "demo") },
  }),

  Rpc.make("deleteUser", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    payload: { userId: Schema.String },
  }),
) {}
