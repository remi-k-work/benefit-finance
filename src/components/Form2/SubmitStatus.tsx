/* eslint-disable @typescript-eslint/no-explicit-any */

// next
import { redirect } from "next/navigation";

// services, features, and other libraries
import { Result, useAtomSubscribe, useAtomValue } from "@effect-atom/atom-react";
import { ParseError } from "effect/ParseResult";
import { BetterAuthApiError, UnauthorizedAccessError } from "@/lib/errors";

// components
import InfoLine from "@/components/Form/InfoLine";
import { toast } from "sonner";

// types
import type { Field } from "@lucas-barake/effect-form-react";
import type { BuiltForm } from "@lucas-barake/effect-form-react/FormReact";
import type { Route } from "next";
import type LangLoader from "@/lib/LangLoader";

interface SubmitStatusProps<TFields extends Field.FieldsRecord, R, A, E> {
  form: BuiltForm<TFields, R, A, E>;
  formName: string;
  succeededDesc: string;
  failedDesc?: string;
  redirectTo?: Route;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

export function SubmitStatus<TFields extends Field.FieldsRecord, R, A, E>({
  form,
  formName,
  succeededDesc,
  failedDesc,
  redirectTo,
  llFormToastFeedback: ll,
}: SubmitStatusProps<TFields, R, A, E>) {
  const submitResult = useAtomValue(form.submit);

  // Display the generic toast notifications
  useAtomSubscribe(
    form.submit,
    (result) => {
      {
        Result.matchWithError(result, {
          onInitial: () => null,
          onSuccess: () => {
            toast.success(ll["SUCCESS!"], { description: succeededDesc });

            // Redirect the user when requested
            if (redirectTo) setTimeout(() => redirect(redirectTo), 3000);
          },
          onError: (error: unknown) =>
            error instanceof ParseError
              ? toast.warning(ll["MISSING FIELDS!"], {
                  description: `${ll["Please correct the"]} ${formName} ${ll["form fields and try again."]}`,
                })
              : error instanceof BetterAuthApiError
                ? toast.error(ll["AUTHORIZATION ERROR!"], {
                    description: ll["Something went wrong; please try again later."],
                  })
                : error instanceof UnauthorizedAccessError
                  ? toast.error(ll["DEMO MODE!"], { description: ll["This action is disabled in demo mode."] })
                  : null,
          onDefect: () =>
            toast.error(ll["SERVER ERROR!"], {
              description: failedDesc ?? `${ll["The"]} ${formName} ${ll["form was not submitted successfully; please try again later."]}`,
            }),
        });
      }
    },
    { immediate: false },
  );

  // Show the permanent feedback message as well
  return (Result.builder(submitResult) as any)
    .onWaiting(() => null)
    .onSuccess(() => <InfoLine message={`[${ll["SUCCESS!"]}] → ${succeededDesc}`} />)
    .onError((error: unknown) =>
      error instanceof ParseError ? (
        <InfoLine message={`[${ll["MISSING FIELDS!"]}] → ${ll["Please correct the"]} ${formName} ${ll["form fields and try again."]} `} />
      ) : error instanceof BetterAuthApiError ? (
        <InfoLine message={`[${ll["AUTHORIZATION ERROR!"]}] → ${ll["Something went wrong; please try again later."]} `} />
      ) : error instanceof UnauthorizedAccessError ? (
        <InfoLine message={`[${ll["DEMO MODE!"]}] → ${ll["This action is disabled in demo mode."]} `} />
      ) : null,
    )
    .onDefect(() => (
      <InfoLine
        message={`[${ll["SERVER ERROR!"]}] → ${failedDesc ?? `${ll["The"]} ${formName} ${ll["form was not submitted successfully; please try again later."]} `} `}
      />
    ))
    .orNull();
}
