// next
import { useRouter } from "next/navigation";

// services, features, and other libraries
import { useFormContext } from ".";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { ArrowLeftCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { ReactNode } from "react";

interface FormSubmitProps {
  submitIcon: ReactNode;
  submitText: string;
  resetText?: string;
  cancelText?: string;
  isPending: boolean;
  showCancel?: boolean;
  onClearedForm?: () => void;
}

export default function FormSubmit({
  submitIcon,
  submitText,
  resetText = "Clear Form",
  cancelText = "Cancel and Go Back",
  isPending,
  showCancel = true,
  onClearedForm,
}: FormSubmitProps) {
  // Get the form context
  const { Subscribe, reset } = useFormContext();

  // To be able to send the user back after canceling
  const { back } = useRouter();

  return (
    <section className="flex flex-wrap items-center gap-6 *:flex-1">
      <Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting, formState.isPristine]}>
        {([canSubmit, isSubmitting, isPristine]) => (
          <Button type="submit" disabled={isPending || !canSubmit || isPristine}>
            {isPending || isSubmitting ? <Loader2 className="size-9 animate-spin" /> : <>{submitIcon}</>}
            {submitText}
          </Button>
        )}
      </Subscribe>
      <Button
        type="button"
        variant="destructive"
        onClick={() => {
          reset();
          onClearedForm?.();
        }}
      >
        <XCircleIcon className="size-9" />
        {resetText}
      </Button>
      {showCancel && (
        <Button type="button" variant="secondary" onClick={() => back()}>
          <ArrowLeftCircleIcon className="size-9" />
          {cancelText}
        </Button>
      )}
    </section>
  );
}
