// react
import { useCallback } from "react";

// components
import { toast } from "sonner";

// types
import type LangLoader from "@/lib/LangLoader";

type ActionStatus = "idle" | "succeeded" | "failed" | "invalid" | "authError" | "demoMode";
type ToastMessages = Pick<Record<ActionStatus, string>, "succeeded"> & Partial<Record<Exclude<ActionStatus, "idle" | "succeeded" | "invalid">, string>>;

// Generic hook for displaying toast notifications for form actions
export default function useFormToastFeedback(
  formName: string,
  { succeeded, failed, authError }: ToastMessages,
  ll: typeof LangLoader.prototype.formToastFeedback,
) {
  return useCallback(
    (actionStatus: ActionStatus) => {
      if (actionStatus === "succeeded") {
        // "succeeded" always needs a custom message
        toast.success(ll["SUCCESS!"], { description: succeeded });
        // "invalid" always generated dynamically with the provided form name
      } else if (actionStatus === "invalid") {
        toast.warning(ll["MISSING FIELDS!"], { description: `${ll["Please correct the"]} ${formName} ${ll["form fields and try again."]}` });
      } else if (actionStatus === "failed") {
        // "failed" may fall back to defaults if not provided
        toast.error(ll["SERVER ERROR!"], {
          description: failed ?? `${ll["The"]} ${formName} ${ll["form was not submitted successfully; please try again later."]}`,
        });
      } else if (actionStatus === "authError") {
        // "authError" may fall back to defaults if not provided
        toast.error(ll["AUTHORIZATION ERROR!"], { description: authError ?? ll["Something went wrong; please try again later."] });
      } else if (actionStatus === "demoMode") {
        toast.error(ll["DEMO MODE!"], { description: ll["This action is disabled in demo mode."] });
      }
    },
    [formName, succeeded, failed, authError, ll],
  );
}
