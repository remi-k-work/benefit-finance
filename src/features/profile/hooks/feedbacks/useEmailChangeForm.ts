// react
import { useEffect, useEffectEvent, useRef } from "react";

// next
import { useRouter } from "next/navigation";

// services, features, and other libraries
import { authClient } from "@/services/better-auth/auth-client";
import { useFormToastFeedback, usePermanentMessageFeedback } from "@/hooks/feedbacks";
import { useDemoModeGuard } from "@/hooks";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";
import type { AnyFormApi } from "@tanstack/react-form";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this form actions
export function useEmailChangeFormFeedback(
  { actionStatus, timestamp }: ActionResultWithFormState,
  reset: () => void,
  formStore: AnyFormApi["store"],
  needsApproval: boolean,
  ll: typeof LangLoader.prototype.emailChangeFormFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // This ref tracks which submission we have already processed (the <Activity /> replay problem fix)
  const lastProcessedTimestampRef = useRef<typeof timestamp>(undefined);

  // Access the user session data from the client side
  const { refetch } = authClient.useSession();

  // To be able to refresh the page
  const { refresh } = useRouter();

  // Generic hook for managing a permanent feedback message
  const { feedbackMessage, showFeedbackMessage, hideFeedbackMessage } = usePermanentMessageFeedback(formStore);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(
    ll["[EMAIL CHANGE]"],
    {
      succeeded: needsApproval
        ? ll["The email change has been initiated and needs to be approved. Please check your current email address for the approval link."]
        : ll["Your email has been changed successfully. A verification email has been sent to your new email address."],
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

      // Refresh the page
      refresh();

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
    // If there is no timestamp, the user has not submitted yet
    if (!timestamp) return;

    // If the timestamp matches our ref, we have already handled this specific submission
    if (timestamp === lastProcessedTimestampRef.current) return;

    // Update the ref immediately so we do not process it again
    lastProcessedTimestampRef.current = timestamp;

    onFeedbackNeeded();
  }, [timestamp]);

  return { feedbackMessage, hideFeedbackMessage };
}
