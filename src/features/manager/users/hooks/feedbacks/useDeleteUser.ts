// react
import { startTransition, useEffect, useEffectEvent } from "react";

// server actions and mutations
import refreshPage from "@/actions/refreshPage";

// services, features, and other libraries
import useFormToastFeedback from "@/hooks/feedbacks/useFormToast";
import useDemoModeGuard from "@/hooks/useDemoModeGuard";

// types
import type { ActionResultWithFormState } from "@/lib/helpersEffect";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this server action
export default function useDeleteUserFeedback(
  { actionStatus }: ActionResultWithFormState,
  ll: typeof LangLoader.prototype.manUsers,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(
    ll["[DELETE USER]"],
    { succeeded: ll["The user has been deleted."], failed: ll["The user could not be deleted; please try again later."] },
    llFormToastFeedback,
  );

  // Custom hook that observes an action's status and automatically opens the global demo mode modal
  const guardForDemoMode = useDemoModeGuard(actionStatus);

  // Function to be called when feedback is needed
  const onFeedbackNeeded = useEffectEvent(() => {
    if (actionStatus === "succeeded") {
      // Display a success message
      showToast("succeeded");

      // Refresh the current page to show the latest data
      startTransition(() => {
        refreshPage();
      });
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
