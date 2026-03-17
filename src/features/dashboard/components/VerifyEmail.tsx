"use client";

// react
import { startTransition, useActionState, useEffect, useState } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { runRpcActionMain } from "@/lib/helpersEffectClient";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { RpcDashboardClient } from "@/features/dashboard/rpc/client";
import { useVerifyEmailFeedback } from "@/features/dashboard/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { Button } from "@/components/ui/custom/button";
import InfoLine from "@/components/Form/InfoLine";

// assets
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { User } from "@/services/better-auth/auth";
import type LangLoader from "@/lib/LangLoader";

interface VerifyEmailProps {
  user: User;
  ll: typeof LangLoader.prototype.verifyEmail;
  llVerifyEmailFeedback: typeof LangLoader.prototype.verifyEmailFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const main = Effect.gen(function* () {
  const { verifyEmail } = yield* RpcDashboardClient;

  const result = yield* verifyEmail().pipe(
    Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
  );
  return { ...initialFormState, ...result } as const;
});

export default function VerifyEmail({ user: { emailVerified }, ll, llVerifyEmailFeedback, llFormToastFeedback }: VerifyEmailProps) {
  // Triggers the email verification process for the current user
  const [verifyEmailState, verifyEmailAction, verifyEmailsPending] = useActionState(async () => await runRpcActionMain(main), {
    ...initialFormState,
    actionStatus: "idle",
  });

  // Provide feedback to the user regarding this server action
  const { feedbackMessage, hideFeedbackMessage } = useVerifyEmailFeedback(verifyEmailState, llVerifyEmailFeedback, llFormToastFeedback);

  // Add a simple cooldown state
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  useEffect(() => {
    if (isCoolingDown) {
      const timer = setTimeout(() => setIsCoolingDown(false), 9000);
      return () => clearTimeout(timer);
    }
  }, [isCoolingDown]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Verify Email"]}</CardTitle>
        <CardDescription>{ll["To access all our features"]}</CardDescription>
      </CardHeader>
      <CardContent>
        {emailVerified ? (
          <InfoLine message={ll["Your email has been verified. Thank you!"]} className="mx-0 mb-0" />
        ) : (
          <>
            <InfoLine message={feedbackMessage} className="mx-0" />
            <Button
              type="button"
              disabled={verifyEmailsPending || isCoolingDown}
              className="mx-auto"
              onClick={() => {
                hideFeedbackMessage();
                setIsCoolingDown(true);
                startTransition(verifyEmailAction);
              }}
            >
              {verifyEmailsPending ? <Loader2 className="size-9 animate-spin" /> : <CheckBadgeIcon className="size-9" />}
              {ll["Verify Email"]}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
