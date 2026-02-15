"use server";

// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { SupAgentChunkDB, SupAgentDocDB } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runServerActionMain } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { SERVER_VALIDATE_EN, SERVER_VALIDATE_PL } from "@/features/manager/supportAgent/constants/editDocForm";
import { generateDocEmbeddings } from "@/features/supportAgent/lib/embeddings";
import { DemoModeError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (docId: string, formData: FormData) =>
  Effect.gen(function* () {
    // Access the user session data from the server side or fail with an unauthorized access error
    const {
      user: { role },
    } = yield* getUserSessionData;

    // Return early if the current user is in demo mode or not an admin
    if (role === "demo" || role !== "admin") return yield* new DemoModeError({ message: "Demo mode" });

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
      // Update a document, delete all chunks for a document, and insert multiple new chunks for a document
      supAgentDocDB
        .updateDoc(docId, { title, content })
        .pipe(Effect.andThen(supAgentChunkDB.deleteChunks(docId)), Effect.andThen(supAgentChunkDB.insertChunks(docId, docEmbeddings))),
    );

    // The form has successfully validated and submitted!
    return { ...initialFormState, actionStatus: "succeeded" } satisfies ActionResultWithFormState;
  });

// The main server action that processes the form
export default async function editDoc(docId: string, _prevState: unknown, formData: FormData): Promise<ActionResultWithFormState> {
  // Execute the main effect for the server action, handle known errors, and return the payload
  return await runServerActionMain(main(docId, formData));
}
