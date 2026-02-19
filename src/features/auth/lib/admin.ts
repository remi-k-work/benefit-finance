// services, features, and other libraries
import { Effect } from "effect";
import { auth } from "@/services/better-auth/auth";
import { getHeaders } from "./helpersEffect";
import { BetterAuthApiError } from "@/lib/errors";

// types
import type { Role } from "@/services/better-auth/auth";

export class AuthAdmin extends Effect.Service<AuthAdmin>()("AuthAdmin", {
  effect: Effect.gen(function* () {
    // Set user role
    const setUserRole = (userId: string, role: Role) =>
      Effect.gen(function* () {
        const headers = yield* getHeaders;
        yield* Effect.tryPromise({
          try: () => auth.api.setRole({ body: { userId, role }, headers }),
          catch: (cause) => new BetterAuthApiError({ message: "Failed to set user role", cause }),
        });
      });

    // Remove user
    const removeUser = (userId: string) =>
      Effect.gen(function* () {
        const headers = yield* getHeaders;
        yield* Effect.tryPromise({
          try: () => auth.api.removeUser({ body: { userId }, headers }),
          catch: (cause) => new BetterAuthApiError({ message: "Failed to remove user", cause }),
        });
      });

    return { setUserRole, removeUser } as const;
  }),
}) {}
