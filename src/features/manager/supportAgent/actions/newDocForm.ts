/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

// next
import { revalidatePath } from "next/cache";

// services, features, and other libraries
import LangLoader from "@/lib/LangLoader";
import { getUserSessionData, makeSureUserIsAuthenticated } from "@/features/auth/lib/helpers";
import { initialFormState, ServerValidateError } from "@tanstack/react-form-nextjs";
import { SERVER_VALIDATE_EN, SERVER_VALIDATE_PL } from "@/features/manager/supportAgent/constants/newDocForm";

// types
import type { ServerFormState } from "@tanstack/react-form-nextjs";

export interface NewDocFormActionResult extends ServerFormState<any, any> {
  actionStatus: "idle" | "succeeded" | "failed" | "invalid" | "demoMode";
}

// The main server action that processes the form
export default async function newDoc(_prevState: unknown, formData: FormData): Promise<NewDocFormActionResult> {
  try {
    // Make sure the current user is authenticated (the check runs on the server side)
    await makeSureUserIsAuthenticated();

    // Access the user session data from the server side
    const {
      user: { role },
    } = (await getUserSessionData())!;

    // Return early if the current user is in demo mode or not an admin
    if (role === "demo" || role !== "admin") return { ...initialFormState, actionStatus: "demoMode" };

    // Create an instance of the lang loader needed for localization
    const { preferredLanguage } = await LangLoader.create();

    // Validate the form on the server side and extract needed data
    const { title, content } = preferredLanguage === "en" ? await SERVER_VALIDATE_EN(formData) : await SERVER_VALIDATE_PL(formData);
  } catch (error) {
    // Validation has failed
    if (error instanceof ServerValidateError) return { ...error.formState, actionStatus: "invalid" };

    // Some other error occurred
    return { ...initialFormState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/", "layout");

  // The form has successfully validated and submitted!
  return { ...initialFormState, actionStatus: "succeeded" };
}
