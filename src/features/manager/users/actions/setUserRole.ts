"use server";

// services, features, and other libraries
import { Effect } from "effect";
import { runServerActionMain } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { AuthAdmin } from "@/features/auth/lib/admin";
import { DemoModeError } from "@/lib/errors";

// types
import type { Role } from "@/services/better-auth/auth";
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (userId: string, newRole: Role) =>
  Effect.gen(function* () {
    // Access the user session data from the server side or fail with an unauthorized access error
    const {
      user: { role },
    } = yield* getUserSessionData;

    // Return early if the current user is in demo mode or not an admin
    if (role === "demo" || role !== "admin") return yield* new DemoModeError({ message: "Demo mode" });

    // Set user role
    const authAdmin = yield* AuthAdmin;
    yield* authAdmin.setUserRole(userId, newRole);

    // The action has completed successfully
    return { ...initialFormState, actionStatus: "succeeded", timestamp: Date.now() } satisfies ActionResultWithFormState;
  });

// This action establishes a new role for a user
export default async function setUserRole(userId: string, newRole: Role): Promise<ActionResultWithFormState> {
  // Execute the main effect for the server action, handle known errors, and return the payload
  return await runServerActionMain(main(userId, newRole));
}
