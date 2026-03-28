// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, DatabaseError, UnauthorizedAccessError, UtApiError } from "@/lib/errors";

// schemas
import { EmailSchemaEn2, NameSchemaEn, PasswordSchemaEn2 } from "@/schemas";

export class RpcProfile extends RpcGroup.make(
  Rpc.make("deleteAvatar", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError, UtApiError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
  }),

  Rpc.make("emailChangeForm", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    payload: { newEmail: EmailSchemaEn2 },
  }),

  Rpc.make("passChangeForm", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    payload: { newPassword: PasswordSchemaEn2, currentPassword: Schema.optional(PasswordSchemaEn2) },
  }),

  Rpc.make("profileDetailsForm", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    payload: { name: NameSchemaEn },
  }),

  Rpc.make("signOutEverywhere", {
    error: Schema.Union(BetterAuthApiError, UnauthorizedAccessError),
    success: Schema.Struct({ actionStatus: Schema.Literal("idle", "succeeded"), timestamp: Schema.optional(Schema.Number) }),
  }),
) {}
