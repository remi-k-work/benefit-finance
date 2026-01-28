// react
import { useEffect, useEffectEvent } from "react";

// next
import { redirect } from "next/navigation";

// services, features, and other libraries
import usePermanentMessageFeedback from "@/hooks/feedbacks/usePermanentMessage";
import useFormToastFeedback from "@/hooks/feedbacks/useFormToast";

// types
import type { RefObject } from "react";
import type { ResetPassFormActionResult } from "@/features/auth/actions/resetPassForm";
import type { AnyFormApi } from "@tanstack/react-form";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this form actions
export default function useResetPassFormFeedback(
  hasPressedSubmitRef: RefObject<boolean>,
  { actionStatus, actionError, errors }: ResetPassFormActionResult,
  reset: () => void,
  formStore: AnyFormApi["store"],
  ll: typeof LangLoader.prototype.resetPassFormFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // Generic hook for managing a permanent feedback message
  const { feedbackMessage, showFeedbackMessage, hideFeedbackMessage } = usePermanentMessageFeedback(formStore);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(
    ll["[RESET PASSWORD]"],
    { succeeded: ll["The password has been reset. Please sign in with your new password."], authError: actionError },
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
    if (hasPressedSubmitRef.current === false) return;
    const timeoutId = onFeedbackNeeded();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasPressedSubmitRef, actionStatus, errors]);

  return { feedbackMessage, hideFeedbackMessage };
}
