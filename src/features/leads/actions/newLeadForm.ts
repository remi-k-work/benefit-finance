"use server";

// drizzle and db access
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runServerActionMain } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { SERVER_VALIDATE_EN, SERVER_VALIDATE_PL } from "@/features/leads/constants/newLeadForm";
import { DemoModeError } from "@/lib/errors";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";

const main = (formData: FormData) =>
  Effect.gen(function* () {
    // Access the user session data from the server side or fail with an unauthorized access error
    const {
      user: { id: referredBy, role },
    } = yield* getUserSessionData;

    // Return early if the current user is in demo mode or not an admin
    if (role === "demo" || role !== "admin") return yield* new DemoModeError({ message: "Demo mode" });

    // Create an instance of the lang loader needed for localization
    const { preferredLanguage } = yield* LangLoader.createEffect();

    // Validate the form on the server side and extract needed data
    const { firstName, lastName, email, phone, serviceOfInterest } =
      preferredLanguage === "en" ? yield* SERVER_VALIDATE_EN(formData) : yield* SERVER_VALIDATE_PL(formData);

    // Insert a new lead
    const leadDB = yield* LeadDB;
    yield* leadDB.insertLead({ referredBy, firstName, lastName, email, phone, serviceOfInterest });

    // The form has successfully validated and submitted!
    return { ...initialFormState, actionStatus: "succeeded", timestamp: Date.now() } satisfies ActionResultWithFormState;
  });

// The main server action that processes the form
export default async function newLeadForm(_prevState: unknown, formData: FormData): Promise<ActionResultWithFormState> {
  // Execute the main effect for the server action, handle known errors, and return the payload
  return await runServerActionMain(main(formData));
}
