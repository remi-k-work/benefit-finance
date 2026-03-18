"use client";

// react
import { startTransition, useActionState } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { runRpcActionMain } from "@/lib/helpersEffectClient";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { useConfirmModal } from "@/atoms/confirmModal";
import { useSignOutEverywhereFeedback } from "@/features/profile/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { Button } from "@/components/ui/custom/button";

// assets
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type LangLoader from "@/lib/LangLoader";

interface SignOutEverywhereProps {
  ll: typeof LangLoader.prototype.signOutEverywhere;
  llSignOutEverywhereFeedback: typeof LangLoader.prototype.signOutEverywhereFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const main = Effect.gen(function* () {
  const { signOutEverywhere } = yield* RpcProfileClient;

  const result = yield* signOutEverywhere().pipe(
    Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
  );
  return { ...initialFormState, ...result } as const;
});

export default function SignOutEverywhere({ ll, llSignOutEverywhereFeedback, llFormToastFeedback }: SignOutEverywhereProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // Signs the user out from all devices
  const [signOutEverywhereState, signOutEverywhereAction, signOutEverywhereIsPending] = useActionState(async () => await runRpcActionMain(main), {
    ...initialFormState,
    actionStatus: "idle",
  });

  // Provide feedback to the user regarding this server action
  useSignOutEverywhereFeedback(signOutEverywhereState, llSignOutEverywhereFeedback, llFormToastFeedback);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Sign Out Everywhere"]}</CardTitle>
        <CardDescription>{ll["Sign out from all devices"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          type="button"
          variant="destructive"
          disabled={signOutEverywhereIsPending}
          className="mx-auto"
          onClick={() => {
            openConfirmModal({
              content: (
                <p className="text-center text-xl">
                  {ll["Are you sure you want to"]} <b className="text-destructive">{ll["sign out"]}</b> {ll["from all devices?"]}
                </p>
              ),
              onConfirmed: () => {
                startTransition(signOutEverywhereAction);
              },
            });
          }}
        >
          {signOutEverywhereIsPending ? <Loader2 className="size-9 animate-spin" /> : <ArrowRightStartOnRectangleIcon className="size-9" />}
          {ll["Sign Out Everywhere"]}
        </Button>
      </CardContent>
    </Card>
  );
}
