"use server";

// drizzle and db access
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect } from "effect";
import { runServerActionMain } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { DemoModeError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (leadId: string) =>
  Effect.gen(function* () {
    // Access the user session data from the server side or fail with an unauthorized access error
    const {
      user: { role },
    } = yield* getUserSessionData;

    // Return early if the current user is in demo mode or not an admin
    if (role === "demo" || role !== "admin") return yield* new DemoModeError({ message: "Demo mode" });

    // Permanently delete a lead from the database
    const leadDB = yield* LeadDB;
    yield* leadDB.deleteLead(leadId);

    // The action has completed successfully
    return { ...initialFormState, actionStatus: "succeeded", timestamp: Date.now() } satisfies ActionResultWithFormState;
  });

// This action permanently deletes a lead from the database
export default async function deleteLead(leadId: string): Promise<ActionResultWithFormState> {
  // Execute the main effect for the server action, handle known errors, and return the payload
  return await runServerActionMain(main(leadId));
}
