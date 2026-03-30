"use client";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtom } from "@effect-atom/atom-react";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { useConfirmModal } from "@/atoms/confirmModal";

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

const signOutEverywhereActionAtom = RuntimeAtom.fn(
  Effect.fnUntraced(function* () {
    const { signOutEverywhere } = yield* RpcProfileClient;
    yield* signOutEverywhere();
  }),
);

export default function SignOutEverywhere({ ll, llSignOutEverywhereFeedback, llFormToastFeedback }: SignOutEverywhereProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // Signs the user out from all devices
  const [signOutEverywhereResult, signOutEverywhereAction] = useAtom(signOutEverywhereActionAtom);

  // Provide feedback to the user regarding this server action
  useSubmitToast(
    signOutEverywhereActionAtom,
    llFormToastFeedback,
    llSignOutEverywhereFeedback["[SIGN OUT EVERYWHERE]"],
    llSignOutEverywhereFeedback["You signed out from all devices successfully."],
    undefined,
    undefined,
    true,
  );

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
          disabled={signOutEverywhereResult.waiting}
          className="mx-auto"
          onClick={() => {
            openConfirmModal({
              content: (
                <p className="text-center text-xl">
                  {ll["Are you sure you want to"]} <b className="text-destructive">{ll["sign out"]}</b> {ll["from all devices?"]}
                </p>
              ),
              onConfirmed: () => {
                signOutEverywhereAction();
              },
            });
          }}
        >
          {signOutEverywhereResult.waiting ? <Loader2 className="size-9 animate-spin" /> : <ArrowRightStartOnRectangleIcon className="size-9" />}
          {ll["Sign Out Everywhere"]}
        </Button>
      </CardContent>
    </Card>
  );
}
