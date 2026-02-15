// react
import { useEffect, useEffectEvent } from "react";

// next
import { redirect } from "next/navigation";

// services, features, and other libraries
import usePermanentMessageFeedback from "@/hooks/feedbacks/usePermanentMessage";
import useFormToastFeedback from "@/hooks/feedbacks/useFormToast";
import useDemoModeGuard from "@/hooks/useDemoModeGuard";

// types
import type { RefObject } from "react";
import type { ActionResultWithFormState } from "@/lib/helpersEffect";
import type { AnyFormApi } from "@tanstack/react-form";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this form actions
export default function useEditDocFormFeedback(
  hasPressedSubmitRef: RefObject<boolean>,
  { actionStatus, errors }: ActionResultWithFormState,
  reset: () => void,
  formStore: AnyFormApi["store"],
  ll: typeof LangLoader.prototype.manSupportAgent,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // Generic hook for managing a permanent feedback message
  const { feedbackMessage, showFeedbackMessage, hideFeedbackMessage } = usePermanentMessageFeedback(formStore);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(ll["[EDIT DOCUMENT]"], { succeeded: ll["The document has been updated."] }, llFormToastFeedback);

  // Custom hook that observes an action's status and automatically opens the global demo mode modal
  const guardForDemoMode = useDemoModeGuard(actionStatus);

  // Function to be called when feedback is needed
  const onFeedbackNeeded = useEffectEvent(() => {
    if (actionStatus === "succeeded") {
      // Display a success message
      showToast("succeeded");

      // Reset the entire form after successful submission
      reset();

      // Show the permanent feedback message as well
      showFeedbackMessage(ll["The document has been updated."]);

      // Redirect the user back to the browse page
      return setTimeout(() => redirect("/manager/support-agent"), 3000);
    } else {
      // Was a restricted operation attempted under the demo account? Inform the user
      guardForDemoMode();

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
