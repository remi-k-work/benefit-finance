"use server";

// drizzle and db access
import type { Status } from "@/drizzle/schema/lead";
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect } from "effect";
import { runServerActionMain } from "@/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { Auth } from "@/features/auth/lib/auth";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (leadId: string, newStatus: Status) =>
  Effect.gen(function* () {
    // Verify if the current user possesses a specific permission
    const auth = yield* Auth;
    yield* auth.assertPermission({ leads: ["update"] });

    // Set lead status
    const leadDB = yield* LeadDB;
    yield* leadDB.updateLead(leadId, { status: newStatus });

    // The action has completed successfully
    return { ...initialFormState, actionStatus: "succeeded", timestamp: Date.now() } satisfies ActionResultWithFormState;
  });

// This action establishes a new status for a lead
export default async function setLeadStatus(leadId: string, newStatus: Status): Promise<ActionResultWithFormState> {
  // Execute the main effect for the server action, handle known errors, and return the payload
  return await runServerActionMain(main(leadId, newStatus));
}
