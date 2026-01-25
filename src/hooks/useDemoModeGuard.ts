// react
import { useCallback } from "react";

// services, features, and other libraries
import { useDemoModeModal } from "@/atoms/demoModeModal";

// Custom hook that observes an action's status and automatically opens the global demo mode modal
export default function useDemoModeGuard(actionStatus: string) {
  // This is the hook that components use to open the modal
  const { openDemoModeModal } = useDemoModeModal();

  // Was a restricted operation attempted under the demo account? Inform the user
  const guardForDemoMode = useCallback(() => {
    if (actionStatus === "demoMode") openDemoModeModal();
  }, [actionStatus, openDemoModeModal]);

  return guardForDemoMode;
}
