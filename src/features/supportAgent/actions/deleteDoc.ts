"use server";

// drizzle and db access
import { SupAgentDocDB } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect } from "effect";
import { runServerActionMain } from "@/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { Auth } from "@/features/auth/lib/auth";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (docId: string) =>
  Effect.gen(function* () {
    // Verify if the current user possesses a specific permission
    const auth = yield* Auth;
    yield* auth.assertPermission({ supportAgent: ["delete"] });

    const supAgentDocDB = yield* SupAgentDocDB;

    // Delete a document
    yield* supAgentDocDB.deleteDoc(docId);

    // The action has completed successfully
    return { ...initialFormState, actionStatus: "succeeded", timestamp: Date.now() } satisfies ActionResultWithFormState;
  });

// This action deletes the support agent document and all of its associated chunks
export default async function deleteDoc(docId: string): Promise<ActionResultWithFormState> {
  // Execute the main effect for the server action, handle known errors, and return the payload
  return await runServerActionMain(main(docId));
}
