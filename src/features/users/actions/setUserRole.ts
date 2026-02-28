"use server";

// services, features, and other libraries
import { Effect } from "effect";
import { runServerActionMain } from "@/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { Auth } from "@/features/auth/lib/auth";

// types
import type { Role } from "@/services/better-auth/auth";
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (userId: string, newRole: Role) =>
  Effect.gen(function* () {
    // Verify if the current user possesses a specific permission
    const auth = yield* Auth;
    yield* auth.assertPermission({ users: ["update"] });

    // Set user role
    yield* auth.setUserRole(userId, newRole);

    // The action has completed successfully
    return { ...initialFormState, actionStatus: "succeeded", timestamp: Date.now() } satisfies ActionResultWithFormState;
  });

// This action establishes a new role for a user
export default async function setUserRole(userId: string, newRole: Role): Promise<ActionResultWithFormState> {
  // Execute the main effect for the server action, handle known errors, and return the payload
  return await runServerActionMain(main(userId, newRole));
}
