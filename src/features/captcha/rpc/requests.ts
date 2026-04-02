// services, features, and other libraries
import { Schema } from "effect";
import { Rpc, RpcGroup } from "@effect/rpc";

// schemas
import { CaptchaInputField } from "@/features/captcha/schemas";

export class RpcCaptcha extends RpcGroup.make(
  Rpc.make("isCaptchaValid", {
    success: Schema.Boolean,
    payload: { captchaInput: CaptchaInputField().schema },
  }),
) {}
