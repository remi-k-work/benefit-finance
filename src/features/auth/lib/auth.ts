// services, features, and other libraries
import { Effect } from "effect";
import { auth } from "@/services/better-auth/auth";
import { getHeaders } from "./helpersEffect";
import { BetterAuthApiError, UnauthorizedAccessError } from "@/lib/errors";

// types
import type { Permission, Role } from "@/services/better-auth/auth";

export class Auth extends Effect.Service<Auth>()("Auth", {
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

    // Verify if the current user possesses a specific permission
    const assertPermission = (permission: Permission) =>
      Effect.gen(function* () {
        const headers = yield* getHeaders;
        yield* Effect.tryPromise({
          try: () => auth.api.userHasPermission({ body: { permission: { ...permission } }, headers }),
          catch: (cause) => new BetterAuthApiError({ message: "Failed to verify permission", cause }),
        }).pipe(
          Effect.filterOrFail(
            ({ success }) => success,
            () => new UnauthorizedAccessError({ message: "Unauthorized access" }),
          ),
        );
      });

    // Access the user session data from the server side or fail with an unauthorized access error
    const getUserSessionData = Effect.gen(function* () {
      const headers = yield* getHeaders;
      return yield* Effect.fromNullable(yield* Effect.promise<Awaited<ReturnType<typeof auth.api.getSession>>>(() => auth.api.getSession({ headers }))).pipe(
        Effect.mapError((cause) => new UnauthorizedAccessError({ message: "Unauthorized access", cause })),
      );
    });

    // Assert that the current user is of a specific role
    const assertRole = (role: Role) =>
      getUserSessionData.pipe(
        Effect.filterOrFail(
          ({ user }) => user.role === role,
          () => new UnauthorizedAccessError({ message: "Unauthorized access" }),
        ),
        Effect.asVoid,
      );

    return { setUserRole, removeUser, assertPermission, getUserSessionData, assertRole } as const;
  }),
}) {}
