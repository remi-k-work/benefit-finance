// next
import { headers } from "next/headers";

// services, features, and other libraries
import { Effect } from "effect";
import { auth } from "@/services/better-auth/auth";
import { BetterAuthApiError, UnauthorizedAccessError } from "@/lib/errors";

// types
import type { Permissions, Role } from "@/services/better-auth/auth";

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

    // Request the password reset through the better-auth api for the user
    const requestPasswordReset = (email: string) =>
      Effect.tryPromise({
        try: () => auth.api.requestPasswordReset({ body: { email, redirectTo: "/reset-password" } }),
        catch: (cause) => new BetterAuthApiError({ message: "Failed to request password reset", cause }),
      }).pipe(Effect.asVoid);

    // Reset the password through the better-auth api for the user
    const resetPassword = (token: string, newPassword: string) =>
      Effect.tryPromise({
        try: () => auth.api.resetPassword({ body: { token, newPassword } }),
        catch: (cause) => new BetterAuthApiError({ message: "Failed to reset password", cause }),
      }).pipe(Effect.asVoid);

    // Sign in the user through the better-auth api
    const signInEmail = (email: string, password: string, rememberMe: boolean) =>
      Effect.gen(function* () {
        const headers = yield* getHeaders;
        yield* Effect.tryPromise({
          try: () => auth.api.signInEmail({ body: { email, password, rememberMe }, headers }),
          catch: (cause) => new BetterAuthApiError({ message: "Failed to sign in", cause }),
        });
      });

    // Sign up the user through the better-auth api
    const signUpEmail = (name: string, email: string, password: string) =>
      Effect.tryPromise({
        try: () => auth.api.signUpEmail({ body: { name, email, password } }),
        catch: (cause) => new BetterAuthApiError({ message: "Failed to sign up", cause }),
      }).pipe(Effect.asVoid);

    // Verify if the current user possesses specific permissions
    const assertPermissions = (permissions: Permissions) =>
      Effect.gen(function* () {
        const headers = yield* getHeaders;
        yield* Effect.tryPromise({
          try: () => auth.api.userHasPermission({ body: { permissions: { ...permissions } }, headers }),
          catch: (cause) => new BetterAuthApiError({ message: "Failed to verify permissions", cause }),
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

    // List all accounts associated with the current user
    const listUserAccounts = Effect.gen(function* () {
      const headers = yield* getHeaders;
      return yield* Effect.promise<Awaited<ReturnType<typeof auth.api.listUserAccounts>>>(() => auth.api.listUserAccounts({ headers }));
    });

    // Determine whether the current user has any "credential" type accounts
    const hasCredentialAccount = Effect.gen(function* () {
      return (yield* listUserAccounts).some((account) => account.providerId === "credential");
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

    return {
      setUserRole,
      removeUser,
      requestPasswordReset,
      resetPassword,
      signInEmail,
      signUpEmail,
      assertPermissions,
      getUserSessionData,
      listUserAccounts,
      hasCredentialAccount,
      assertRole,
    } as const;
  }),
}) {}

const getHeaders = Effect.promise<Awaited<ReturnType<typeof headers>>>(() => headers());
