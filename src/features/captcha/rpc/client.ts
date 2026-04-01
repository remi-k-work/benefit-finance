// services, features, and other libraries
import { Effect, Layer } from "effect";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { FetchHttpClient } from "@effect/platform";
import { RpcCaptcha } from "./requests";

const ProtocolLive = RpcClient.layerProtocolHttp({ url: "/api/rpc/captcha" }).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerNdjson]));

export class RpcCaptchaClient extends Effect.Service<RpcCaptchaClient>()("RpcCaptchaClient", {
  dependencies: [ProtocolLive],
  scoped: RpcClient.make(RpcCaptcha),
}) {}
