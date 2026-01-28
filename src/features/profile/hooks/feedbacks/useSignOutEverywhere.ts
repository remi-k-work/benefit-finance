// react
import { useEffect, useEffectEvent } from "react";

// services, features, and other libraries
import useFormToastFeedback from "@/hooks/feedbacks/useFormToast";

// types
import type { SignOutEverywhereActionResult } from "@/features/profile/actions/signOutEverywhere";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this server action
export default function useSignOutEverywhereFeedback(
  { actionStatus, actionError }: SignOutEverywhereActionResult,
  ll: typeof LangLoader.prototype.signOutEverywhereFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(
    ll["[SIGN OUT EVERYWHERE]"],
    { succeeded: ll["You signed out from all devices successfully."], authError: actionError },
    llFormToastFeedback,
  );

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
    onFeedbackNeeded();
  }, [actionStatus]);
}
