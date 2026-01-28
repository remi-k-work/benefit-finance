"use client";

// react
import { startTransition, useActionState } from "react";

// server actions and mutations
import signOutEverywhere from "@/features/profile/actions/signOutEverywhere";

// services, features, and other libraries
import { useConfirmModal } from "@/atoms/confirmModal";
import useSignOutEverywhereFeedback from "@/features/profile/hooks/feedbacks/useSignOutEverywhere";

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
}

export default function SignOutEverywhere({ ll }: SignOutEverywhereProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // Signs the user out from all devices
  const [signOutEverywhereState, signOutEverywhereAction, signOutEverywhereIsPending] = useActionState(signOutEverywhere, { actionStatus: "idle" });

  // Provide feedback to the user regarding this server action
  useSignOutEverywhereFeedback(signOutEverywhereState);

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
