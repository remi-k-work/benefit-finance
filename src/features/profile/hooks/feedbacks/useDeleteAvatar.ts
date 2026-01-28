// react
import { useEffect, useEffectEvent } from "react";

// services, features, and other libraries
import { authClient } from "@/services/better-auth/auth-client";
import useFormToastFeedback from "@/hooks/feedbacks/useFormToast";
import useDemoModeGuard from "@/hooks/useDemoModeGuard";

// types
import type { DeleteAvatarActionResult } from "@/features/profile/actions/deleteAvatar";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this server action
export default function useDeleteAvatarFeedback(
  { actionStatus, actionError }: DeleteAvatarActionResult,
  ll: typeof LangLoader.prototype.deleteAvatarFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // Access the user session data from the client side
  const { refetch } = authClient.useSession();

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(
    ll["[PROFILE DETAILS]"],
    { succeeded: ll["Your avatar has been deleted."], failed: ll["Your avatar could not be deleted; please try again later."], authError: actionError },
    llFormToastFeedback,
  );

  // Custom hook that observes an action's status and automatically opens the global demo mode modal
  const guardForDemoMode = useDemoModeGuard(actionStatus);

  // Function to be called when feedback is needed
  const onFeedbackNeeded = useEffectEvent(() => {
    if (actionStatus === "succeeded") {
      // Display a success message
      showToast("succeeded");

      // Refetch the user session data with the modified changes
      refetch();
    } else {
      // Was a restricted operation attempted under the demo account? Inform the user
      guardForDemoMode();

      // All other statuses ("invalid", "failed", "authError") handled centrally
      showToast(actionStatus);
    }
  });

  useEffect(() => {
    onFeedbackNeeded();
  }, [actionStatus]);
}
