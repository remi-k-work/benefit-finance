// services, features, and other libraries
import { Effect, Layer } from "effect";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcCaptcha } from "./requests";
import { Captcha } from "@/features/captcha/lib/captcha";

const RpcCaptchaLayer = RpcCaptcha.toLayer({
  isCaptchaValid: ({ captchaInput }) =>
    Effect.gen(function* () {
      // Check the captcha to ensure it matches
      const captcha = yield* Captcha;
      return yield* captcha.isCaptchaValid(captchaInput);
    }),
}).pipe(Layer.provide(Captcha.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcCaptcha, {
  layer: Layer.mergeAll(RpcCaptchaLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
