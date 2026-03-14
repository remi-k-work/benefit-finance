// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError } from "@/lib/errors";

export class RpcLeads extends RpcGroup.make(
  Rpc.make("newLeadForm", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("editLeadNotesForm", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { leadId: Schema.UUID, formDataRecord: Schema.Record({ key: Schema.String, value: Schema.String }) },
  }),

  Rpc.make("setLeadStatus", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { leadId: Schema.UUID, newStatus: Schema.Literal("during", "accepted", "rejected") },
  }),

  Rpc.make("deleteLead", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError, ValidationHasFailedError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
    payload: { leadId: Schema.UUID },
  }),
) {}
