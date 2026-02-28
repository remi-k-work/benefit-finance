"use server";

// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { SupAgentChunkDB, SupAgentDocDB } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runServerActionMain } from "@/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { Auth } from "@/features/auth/lib/auth";
import { SERVER_VALIDATE_EN, SERVER_VALIDATE_PL } from "@/features/supportAgent/constants/newDocForm";
import { generateDocEmbeddings } from "@/features/supportAgent/lib/embeddings";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (formData: FormData) =>
  Effect.gen(function* () {
    // Verify if the current user possesses a specific permission
    const auth = yield* Auth;
    yield* auth.assertPermission({ supportAgent: ["create"] });

    // Create an instance of the lang loader needed for localization
    const { preferredLanguage } = yield* LangLoader.createEffect();

    // Validate the form on the server side and extract needed data
    const { title, content } = preferredLanguage === "en" ? yield* SERVER_VALIDATE_EN(formData) : yield* SERVER_VALIDATE_PL(formData);

    const db = yield* DB;
    const supAgentDocDB = yield* SupAgentDocDB;
    const supAgentChunkDB = yield* SupAgentChunkDB;

    // Generate embeddings for a document first; it is an external api call that may throw and is time-consuming (no db lock held)
    const docEmbeddings = yield* generateDocEmbeddings(content);

    // Run all db operations in a transaction
    yield* db.transaction(
      // Insert a new document, and insert multiple new chunks for a document
      supAgentDocDB.insertDoc({ title, content }).pipe(Effect.andThen(([{ id }]) => supAgentChunkDB.insertChunks(id, docEmbeddings))),
    );

    // The form has successfully validated and submitted!
    return { ...initialFormState, actionStatus: "succeeded", timestamp: Date.now() } satisfies ActionResultWithFormState;
  });

// The main server action that processes the form
export default async function newDocForm(_prevState: unknown, formData: FormData): Promise<ActionResultWithFormState> {
  // Execute the main effect for the server action, handle known errors, and return the payload
  return await runServerActionMain(main(formData));
}
