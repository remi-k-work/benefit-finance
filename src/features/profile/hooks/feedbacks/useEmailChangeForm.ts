// react
import { useEffect, useEffectEvent } from "react";

// services, features, and other libraries
import { authClient } from "@/services/better-auth/auth-client";
import usePermanentMessageFeedback from "@/hooks/feedbacks/usePermanentMessage";
import useFormToastFeedback from "@/hooks/feedbacks/useFormToast";
import useDemoModeGuard from "@/hooks/useDemoModeGuard";

// types
import type { RefObject } from "react";
import type { EmailChangeFormActionResult } from "@/features/profile/actions/emailChangeForm";
import type { AnyFormApi } from "@tanstack/react-form";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this form actions
export default function useEmailChangeFormFeedback(
  hasPressedSubmitRef: RefObject<boolean>,
  { actionStatus, actionError, needsApproval, errors }: EmailChangeFormActionResult,
  reset: () => void,
  formStore: AnyFormApi["store"],
  ll: typeof LangLoader.prototype.emailChangeFormFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // Access the user session data from the client side
  const { refetch } = authClient.useSession();

  // Generic hook for managing a permanent feedback message
  const { feedbackMessage, showFeedbackMessage, hideFeedbackMessage } = usePermanentMessageFeedback(formStore);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(
    ll["[EMAIL CHANGE]"],
    {
      succeeded: needsApproval
        ? ll["The email change has been initiated and needs to be approved. Please check your current email address for the approval link."]
        : ll["Your email has been changed successfully. A verification email has been sent to your new email address."],
      authError: actionError,
    },
    llFormToastFeedback,
  );

  // Custom hook that observes an action's status and automatically opens the global demo mode modal
  const guardForDemoMode = useDemoModeGuard(actionStatus);

  // Function to be called when feedback is needed
  const onFeedbackNeeded = useEffectEvent(() => {
    if (actionStatus === "succeeded") {
      // Display a success message
      showToast("succeeded");

      // Reset the entire form after successful submission
      reset();

      // Refetch the user session data with the modified changes
      refetch();

      // Show the permanent feedback message as well
      showFeedbackMessage(
        needsApproval
          ? ll["The email change has been initiated and needs to be approved. Please check your current email address for the approval link."]
          : ll["Your email has been changed successfully. A verification email has been sent to your new email address."],
      );
    } else {
      // Was a restricted operation attempted under the demo account? Inform the user
      guardForDemoMode();

      // All other statuses ("invalid", "failed", "authError") handled centrally
      showToast(actionStatus);
    }
  });

  useEffect(() => {
    if (hasPressedSubmitRef.current === false) return;
    onFeedbackNeeded();
  }, [hasPressedSubmitRef, actionStatus, errors]);

  return { feedbackMessage, hideFeedbackMessage };
}
