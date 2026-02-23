// react
import { useEffect, useEffectEvent } from "react";

// services, features, and other libraries
import usePermanentMessageFeedback from "@/hooks/feedbacks/usePermanentMessage";
import useFormToastFeedback from "@/hooks/feedbacks/useFormToast";

// types
import type { RefObject } from "react";
import type { ContactUsFormActionResult } from "@/features/contactUs/actions/contactUsForm";
import type { AnyFormApi } from "@tanstack/react-form";
import type LangLoader from "@/lib/LangLoader";

// Provide feedback to the user regarding this form actions
export default function useContactUsFormFeedback(
  hasPressedSubmitRef: RefObject<boolean>,
  { actionStatus, errors }: ContactUsFormActionResult,
  reset: () => void,
  formStore: AnyFormApi["store"],
  ll: typeof LangLoader.prototype.contactUsFormFeedback,
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback,
) {
  // Generic hook for managing a permanent feedback message
  const { feedbackMessage, showFeedbackMessage, hideFeedbackMessage } = usePermanentMessageFeedback(formStore);

  // Generic hook for displaying toast notifications for form actions
  const showToast = useFormToastFeedback(ll["[CONTACT US]"], { succeeded: ll["Your message has been sent."] }, llFormToastFeedback);

  // Function to be called when feedback is needed
  const onFeedbackNeeded = useEffectEvent(() => {
    if (actionStatus === "succeeded") {
      // Display a success message
      showToast("succeeded");

      // Reset the entire form after successful submission
      reset();

      // Show the permanent feedback message as well
      showFeedbackMessage(ll["Your message has been sent."]);
    } else {
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
