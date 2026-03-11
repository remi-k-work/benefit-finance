// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";
import { BetterAuthApiError, UnauthorizedAccessError } from "@/lib/errors2";

class RequestError extends Schema.TaggedClass<RequestError>()("RequestError", {
  errorMessage: Schema.String,
}) {}

// 👇 Rpc API group shared between server and client
export class RpcAuth extends RpcGroup.make(
  Rpc.make("SignUpRequest", {
    error: Schema.Union(RequestError, UnauthorizedAccessError, BetterAuthApiError),
    success: Schema.Boolean,
    payload: {
      email: Schema.NonEmptyString,
      password: Schema.String,
    },
  }),
) {}
