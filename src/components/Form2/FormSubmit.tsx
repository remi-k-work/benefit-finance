// next
import { useRouter } from "next/navigation";

// services, features, and other libraries
import { Option } from "effect";
import { useAtomSet, useAtomValue } from "@effect-atom/atom-react";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { ArrowLeftCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { Field } from "@lucas-barake/effect-form-react";
import type { BuiltForm } from "@lucas-barake/effect-form-react/FormReact";
import type { ReactNode } from "react";

interface FormSubmitProps<TFields extends Field.FieldsRecord, R, A, E> {
  form: BuiltForm<TFields, R, A, E>;
  submitIcon: ReactNode;
  submitText: string;
  resetText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onClearedForm?: () => void;
}

export function FormSubmit<TFields extends Field.FieldsRecord, R, A, E>({
  form,
  submitIcon,
  submitText,
  resetText = "Clear Form",
  cancelText = "Cancel and Go Back",
  showCancel = true,
  onClearedForm,
}: FormSubmitProps<TFields, R, A, E>) {
  // Get the form context
  const isDirty = useAtomValue(form.isDirty);
  const { waiting } = useAtomValue(form.submit);
  const hasChangedSinceSubmit = useAtomValue(form.hasChangedSinceSubmit);
  const lastSubmittedValues = useAtomValue(form.lastSubmittedValues);
  const reset = useAtomSet(form.reset);

  // To be able to send the user back after canceling
  const { back } = useRouter();

  // Determine allowance to submit the form
  const hasSubmittedSuccessfully = Option.isSome(lastSubmittedValues);
  const canSubmit = isDirty && !waiting && (hasChangedSinceSubmit || !hasSubmittedSuccessfully);

  return (
    <section className="flex flex-wrap gap-3 *:flex-1 md:gap-6">
      <Button type="submit" disabled={!canSubmit}>
        {waiting ? <Loader2 className="size-9 animate-spin" /> : <>{submitIcon}</>}
        {submitText}
      </Button>
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
