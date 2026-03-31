// drizzle and db access
import { serviceOfInterestEnum } from "@/drizzle/schema/lead";

// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, DatabaseError, UnauthorizedAccessError } from "@/lib/errors";

// schemas
import { EmailSchemaEn2, NameSchemaEn, PhoneSchemaEn2 } from "@/schemas";

export class RpcLeads extends RpcGroup.make(
  Rpc.make("newLeadForm", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: {
      firstName: NameSchemaEn,
      lastName: NameSchemaEn,
      email: EmailSchemaEn2,
      phone: PhoneSchemaEn2(),
      serviceOfInterest: Schema.Literal(...serviceOfInterestEnum.enumValues),
      mustConfirmDataSharing: Schema.Boolean.pipe(Schema.filter((b) => b === true)),
      mustAcceptPartnershipTerms: Schema.Boolean.pipe(Schema.filter((b) => b === true)),
    },
  }),

  Rpc.make("editLeadNotesForm", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: { leadId: Schema.UUID, internalNotes: Schema.Trim.pipe(Schema.maxLength(2048)) },
  }),

  Rpc.make("setLeadStatus", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: { leadId: Schema.UUID, newStatus: Schema.Literal("during", "accepted", "rejected") },
  }),

  Rpc.make("deleteLead", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: { leadId: Schema.UUID },
  }),
) {}
