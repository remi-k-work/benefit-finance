/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

// next
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// services, features, and other libraries
import LangLoader from "@/lib/LangLoader";
import { initialFormState, ServerValidateError } from "@tanstack/react-form-nextjs";
import { SERVER_VALIDATE_EN, SERVER_VALIDATE_PL } from "@/features/frontend/constants/contactUsForm";
import { getIronSession } from "iron-session";

// types
import type { ServerFormState, StandardSchemaV1Issue } from "@tanstack/react-form-nextjs";
import type { CaptchaSession } from "@/app/api/captcha/[name]/route";

export interface ContactUsFormActionResult extends ServerFormState<any, any> {
  actionStatus: "idle" | "succeeded" | "failed" | "invalid" | "invalid-captcha";
}

// The main server action that processes the form
export default async function signUp(_prevState: unknown, formData: FormData): Promise<ContactUsFormActionResult> {
  try {
    // Create an instance of the lang loader needed for localization
    const { preferredLanguage } = await LangLoader.create();

    // Validate the form on the server side and extract needed data
    const { captcha } = preferredLanguage === "en" ? await SERVER_VALIDATE_EN(formData) : await SERVER_VALIDATE_PL(formData);

    // Check the captcha to ensure it matches
    const { captchaString } = await getIronSession<CaptchaSession>(await cookies(), { password: process.env.SESSION_SECRET as string, cookieName: "captcha" });

    if (captcha !== captchaString) {
      // The captcha is invalid; please try again
      const formErrors: Record<string, StandardSchemaV1Issue[]> = {
        captcha: [{ message: "Invalid captcha", path: ["captcha"] }],
      };
      return {
        ...initialFormState,
        errors: [formErrors],
        errorMap: { onServer: { form: { ...formErrors }, fields: { ...formErrors } } },
        actionStatus: "invalid-captcha",
      };
    }
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
