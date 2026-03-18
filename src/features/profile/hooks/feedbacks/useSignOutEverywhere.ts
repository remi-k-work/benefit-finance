// react
import { useEffect, useEffectEvent, useRef } from "react";

// services, features, and other libraries
import { useFormToastFeedback } from "@/hooks/feedbacks";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this server action
export function useSignOutEverywhereFeedback(
  { actionStatus, timestamp }: ActionResultWithFormState,
  ll: typeof LangLoader.prototype.signOutEverywhereFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // This ref tracks which submission we have already processed (the <Activity /> replay problem fix)
  const lastProcessedTimestampRef = useRef<typeof timestamp>(undefined);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(ll["[SIGN OUT EVERYWHERE]"], { succeeded: ll["You signed out from all devices successfully."] }, llFormToastFeedback);

  // Function to be called when feedback is needed
  const onFeedbackNeeded = useEffectEvent(() => {
    if (actionStatus === "succeeded") {
      // Display a success message
      showToast("succeeded");
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

    onFeedbackNeeded();
  }, [timestamp]);
}
