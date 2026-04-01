// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { AiSdkError, BetterAuthApiError, DatabaseError, UnauthorizedAccessError } from "@/lib/errors";

// schemas
import { ContentField, TitleField } from "@/features/supportAgent/schemas";

export class RpcSupportAgent extends RpcGroup.make(
  Rpc.make("newDocForm", {
    error: Schema.Union(AiSdkError, BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: { title: TitleField("en").schema, content: ContentField("en").schema },
  }),

  Rpc.make("editDocForm", {
    error: Schema.Union(AiSdkError, BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: { docId: Schema.UUID, title: TitleField("en").schema, content: ContentField("en").schema },
  }),

  Rpc.make("deleteDoc", {
    error: Schema.Union(BetterAuthApiError, DatabaseError, UnauthorizedAccessError),
    payload: { docId: Schema.UUID },
  }),
) {}
