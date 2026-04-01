// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";

export class RpcCaptcha extends RpcGroup.make(
  Rpc.make("isCaptchaValid", {
    success: Schema.Boolean,
    payload: { captchaInput: Schema.Trim.pipe(Schema.nonEmptyString(), Schema.maxLength(6)) },
  }),
) {}
