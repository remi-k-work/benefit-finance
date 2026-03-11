// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError } from "@/lib/errors";

export class RpcLeads extends RpcGroup.make(
  Rpc.make("deleteLead", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded", "failed", "invalid", "demoMode"), timestamp: Schema.optional(Schema.Number) }),
    payload: { leadId: Schema.UUID },
  }),
) {}
