// services, features, and other libraries
import { Effect, Layer } from "effect";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcUsers } from "./requests";
import { Auth } from "@/features/auth/lib/auth";

const RpcUsersLayer = RpcUsers.toLayer({
  setUserRole: ({ userId, newRole }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ users: ["update"] });

      // Set user role
      yield* auth.setUserRole(userId, newRole);
    }),

  deleteUser: ({ userId }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ users: ["delete"] });

      // Permanently delete a user from the database
      yield* auth.removeUser(userId);
    }),
}).pipe(Layer.provide(Auth.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcUsers, {
  layer: Layer.mergeAll(RpcUsersLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
