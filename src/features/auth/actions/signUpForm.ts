/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

// next
import { revalidatePath } from "next/cache";

// services, features, and other libraries
import LangLoader from "@/lib/LangLoader";
import { auth } from "@/services/better-auth/auth";
import { initialFormState, ServerValidateError } from "@tanstack/react-form-nextjs";
import { SERVER_VALIDATE_EN, SERVER_VALIDATE_PL } from "@/features/auth/constants/signUpForm";
import { APIError } from "better-auth/api";

// types
import type { ServerFormState } from "@tanstack/react-form-nextjs";

export interface SignUpFormActionResult extends ServerFormState<any, any> {
  actionStatus: "idle" | "succeeded" | "failed" | "invalid" | "authError";
  actionError?: string;
}

// The main server action that processes the form
export default async function signUp(_prevState: unknown, formData: FormData): Promise<SignUpFormActionResult> {
  try {
    // Create an instance of the lang loader needed for localization
    const { preferredLanguage } = await LangLoader.create();

    // Validate the form on the server side and extract needed data
    const { name, email, password } = preferredLanguage === "en" ? await SERVER_VALIDATE_EN(formData) : await SERVER_VALIDATE_PL(formData);

    // Sign up the user through the better-auth api
    await auth.api.signUpEmail({ body: { name, email, password } });
  } catch (error) {
    // Validation has failed
    if (error instanceof ServerValidateError) return { ...error.formState, actionStatus: "invalid" };

    // The better-auth api request failed with an error
    if (error instanceof APIError) return { ...initialFormState, actionStatus: "authError", actionError: error.message };

    // Some other error occurred
    return { ...initialFormState, actionStatus: "failed" };
  }

  // Revalidate, so the fresh data will be fetched from the server next time this path is visited
  revalidatePath("/", "layout");

  // The form has successfully validated and submitted!
  return { ...initialFormState, actionStatus: "succeeded" };
}
