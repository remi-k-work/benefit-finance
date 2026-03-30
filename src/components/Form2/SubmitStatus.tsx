/* eslint-disable @typescript-eslint/no-explicit-any */

// services, features, and other libraries
import { Result, useAtomValue } from "@effect-atom/atom-react";
import { ParseError } from "effect/ParseResult";
import { BetterAuthApiError, UnauthorizedAccessError } from "@/lib/errors";

// components
import { InfoLine } from "./InfoLine";

// types
import type { Field } from "@lucas-barake/effect-form-react";
import type { BuiltForm } from "@lucas-barake/effect-form-react/FormReact";
import type LangLoader from "@/lib/LangLoader";

interface SubmitStatusProps<TFields extends Field.FieldsRecord, R, A, E, SubmitArgs> {
  form: BuiltForm<TFields, R, A, E, SubmitArgs>;
  ll: typeof LangLoader.prototype.formToastFeedback;
  formName: string;
  succeededDesc: string;
  failedDesc?: string;
}

export function SubmitStatus<TFields extends Field.FieldsRecord, R, A, E, SubmitArgs>({
  form,
  ll,
  formName,
  succeededDesc,
  failedDesc,
}: SubmitStatusProps<TFields, R, A, E, SubmitArgs>) {
  const submitResult = useAtomValue(form.submit);

  // Show the permanent feedback message as well
  return (Result.builder(submitResult) as any)
    .onWaiting(() => null)
    .onSuccess(() => <InfoLine message={`[${ll["SUCCESS!"]}] → ${succeededDesc}`} />)
    .onError((error: unknown) =>
      error instanceof ParseError ? (
        <InfoLine message={`[${ll["MISSING FIELDS!"]}] → ${ll["Please correct the"]} ${formName} ${ll["form fields and try again."]}`} />
      ) : error instanceof BetterAuthApiError ? (
        <InfoLine message={`[${ll["AUTHORIZATION ERROR!"]}] → ${ll["Something went wrong; please try again later."]} → ${error.message}`} />
      ) : error instanceof UnauthorizedAccessError ? (
        <InfoLine message={`[${ll["DEMO MODE!"]}] → ${ll["This action is disabled in demo mode."]}`} />
      ) : null,
    )
    .onDefect(() => (
      <InfoLine
        message={`[${ll["SERVER ERROR!"]}] → ${failedDesc ?? `${ll["The"]} ${formName} ${ll["form was not submitted successfully; please try again later."]}`}`}
      />
    ))
    .orNull();
}
