"use server";

// drizzle and db access
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect } from "effect";
import { runServerActionMain } from "@/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { Auth } from "@/features/auth/lib/auth";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (leadId: string) =>
  Effect.gen(function* () {
    // Verify if the current user possesses a specific permission
    const auth = yield* Auth;
    yield* auth.assertPermission({ leads: ["delete"] });

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
