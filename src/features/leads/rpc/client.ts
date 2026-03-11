// services, features, and other libraries
import { Effect, Layer } from "effect";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { FetchHttpClient } from "@effect/platform";
import { RpcLeads } from "./requests";

const ProtocolLive = RpcClient.layerProtocolHttp({
  url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/rpc/leads`,
}).pipe(Layer.provide([FetchHttpClient.layer, RpcSerialization.layerNdjson]));

export class RpcLeadsClient extends Effect.Service<RpcLeadsClient>()("RpcLeadsClient", {
  dependencies: [ProtocolLive],
  scoped: RpcClient.make(RpcLeads),
}) {}
