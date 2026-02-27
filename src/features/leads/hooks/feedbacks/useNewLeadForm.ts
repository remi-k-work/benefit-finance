// react
import { startTransition, useEffect, useEffectEvent, useRef } from "react";

// next
import { redirect } from "next/navigation";

// server actions and mutations
import refreshPage from "@/actions/refreshPage";

// services, features, and other libraries
import usePermanentMessageFeedback from "@/hooks/feedbacks/usePermanentMessage";
import useFormToastFeedback from "@/hooks/feedbacks/useFormToast";
import useDemoModeGuard from "@/hooks/useDemoModeGuard";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";
import type { AnyFormApi } from "@tanstack/react-form";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this form actions
export default function useNewLeadFormFeedback(
  { actionStatus, timestamp }: ActionResultWithFormState,
  reset: () => void,
  formStore: AnyFormApi["store"],
  ll: typeof LangLoader.prototype.leads,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // This ref tracks which submission we have already processed (the <Activity /> replay problem fix)
  const lastProcessedTimestampRef = useRef<typeof timestamp>(undefined);

  // Generic hook for managing a permanent feedback message
  const { feedbackMessage, showFeedbackMessage, hideFeedbackMessage } = usePermanentMessageFeedback(formStore);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(ll["[NEW LEAD SUBMISSION]"], { succeeded: ll["The new lead has been submitted. Thank you!"] }, llFormToastFeedback);

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
      showFeedbackMessage(ll["The new lead has been submitted. Thank you!"]);

      // Redirect the user back to the browse page
      return setTimeout(() => {
        // Refresh the current page to show the latest data
        startTransition(() => {
          refreshPage();
        });
        redirect("/dashboard");
      }, 3000);
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

    const timeoutId = onFeedbackNeeded();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timestamp]);

  return { feedbackMessage, hideFeedbackMessage };
}
