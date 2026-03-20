// services, features, and other libraries
import { useFieldContext } from "@/components/Form";

// components
import ErrorList from "./ErrorList";

// types
import type { ZodError } from "zod";

export default function FieldErrors() {
  // Get the field context
  const {
    state: {
      meta: { errors, isTouched },
    },
  } = useFieldContext();

  // Only render errors once the field has been touched and is no longer pristine
  const errorMessages = isTouched ? errors.map(({ message }: ZodError) => message) : [];

  // Live error messages (unique strings)
  const liveErrorMessages = [...new Set(errorMessages)];

  return (
    <div className="min-h-4">
      <ErrorList messages={liveErrorMessages} />
    </div>
  );
}
