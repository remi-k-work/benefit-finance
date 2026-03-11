// services, features, and other libraries
import { Console, Effect, Layer } from "effect";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcAuth } from "./requests";
import { Auth } from "@/features/auth/lib/auth";

const RpcAuthLayer = RpcAuth.toLayer({
  SignUpRequest: (params) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ leads: ["delete"] });

      // 👇 `params` contains the payload defined in `Rpc.make`
      yield* Console.log(params.email, params.password);
      return true;
    }),
}).pipe(Layer.provide(Auth.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcAuth, {
  layer: Layer.mergeAll(RpcAuthLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
