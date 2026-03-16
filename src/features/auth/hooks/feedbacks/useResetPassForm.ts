// react
import { useEffect, useEffectEvent, useRef } from "react";

// next
import { redirect } from "next/navigation";

// services, features, and other libraries
import { useFormToastFeedback, usePermanentMessageFeedback } from "@/hooks/feedbacks";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";
import type { AnyFormApi } from "@tanstack/react-form";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this form actions
export function useResetPassFormFeedback(
  { actionStatus, timestamp }: ActionResultWithFormState,
  reset: () => void,
  formStore: AnyFormApi["store"],
  ll: typeof LangLoader.prototype.resetPassFormFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // This ref tracks which submission we have already processed (the <Activity /> replay problem fix)
  const lastProcessedTimestampRef = useRef<typeof timestamp>(undefined);

  // Generic hook for managing a permanent feedback message
  const { feedbackMessage, showFeedbackMessage, hideFeedbackMessage } = usePermanentMessageFeedback(formStore);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(
    ll["[RESET PASSWORD]"],
    { succeeded: ll["The password has been reset. Please sign in with your new password."] },
    llFormToastFeedback,
  );

  // Function to be called when feedback is needed
  const onFeedbackNeeded = useEffectEvent(() => {
    if (actionStatus === "succeeded") {
      // Display a success message
      showToast("succeeded");

      // Reset the entire form after successful submission
      reset();

      // Show the permanent feedback message as well
      showFeedbackMessage(ll["The password has been reset. Please sign in with your new password."]);

      // Redirect the user after successful password reset
      return setTimeout(() => redirect("/sign-in"), 3000);
    } else {
      // All other statuses ("invalid", "failed", "authError") handled centrally
      showToast(actionStatus);
    }
  });

  useEffect(() => {
    // If there is no timestamp, the user has not submitted yet
    if (!timestamp) return;

    // If the timestamp matches our ref, we have already handled this specific submission
    if (timestamp === lastProcessedTimestampRef.current) return;

    // Update the ref immediately so we do not process it again
    lastProcessedTimestampRef.current = timestamp;

    const timeoutId = onFeedbackNeeded();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timestamp]);

  return { feedbackMessage, hideFeedbackMessage };
}
