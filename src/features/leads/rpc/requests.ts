// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, DatabaseError, UnauthorizedAccessError } from "@/lib/errors";

// schemas
import { EmailField, NameField, PhoneField } from "@/schemas";
import { InternalNotesField, MustAcceptPartnershipTermsField, MustConfirmDataSharingField, ServiceOfInterestField } from "@/features/leads/schemas";

export class RpcLeads extends RpcGroup.make(
  Rpc.make("newLeadForm", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: {
      firstName: NameField().schema,
      lastName: NameField().schema,
      email: EmailField().schema,
      phone: PhoneField().schema,
      serviceOfInterest: ServiceOfInterestField.schema,
      mustConfirmDataSharing: MustConfirmDataSharingField().schema,
      mustAcceptPartnershipTerms: MustAcceptPartnershipTermsField().schema,
    },
  }),

  Rpc.make("editLeadNotesForm", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: { leadId: Schema.UUID, internalNotes: InternalNotesField().schema },
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
