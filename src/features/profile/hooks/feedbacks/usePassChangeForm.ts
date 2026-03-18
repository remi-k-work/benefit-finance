// react
import { useEffect, useEffectEvent, useRef } from "react";

// next
import { useRouter } from "next/navigation";

// services, features, and other libraries
import { useFormToastFeedback, usePermanentMessageFeedback } from "@/hooks/feedbacks";
import { useDemoModeGuard } from "@/hooks";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";
import type { AnyFormApi } from "@tanstack/react-form";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this form actions
export function usePassChangeFormFeedback(
  { actionStatus, timestamp }: ActionResultWithFormState,
  reset: () => void,
  formStore: AnyFormApi["store"],
  hasCredential: boolean,
  ll: typeof LangLoader.prototype.passChangeFormFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // This ref tracks which submission we have already processed (the <Activity /> replay problem fix)
  const lastProcessedTimestampRef = useRef<typeof timestamp>(undefined);

  // To be able to refresh the page
  const { refresh } = useRouter();

  // Generic hook for managing a permanent feedback message
  const { feedbackMessage, showFeedbackMessage, hideFeedbackMessage } = usePermanentMessageFeedback(formStore);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(
    hasCredential ? ll["[PASSWORD CHANGE]"] : ll["[PASSWORD SETUP]"],
    {
      succeeded: hasCredential ? ll["Your password has been changed."] : ll["Your password has been setup."],
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

      // Refresh the page
      refresh();

      // Show the permanent feedback message as well
      showFeedbackMessage(hasCredential ? ll["Your password has been changed."] : ll["Your password has been setup."]);
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
