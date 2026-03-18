// react
import { startTransition, useActionState } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { runRpcActionMain } from "@/lib/helpersEffectClient";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { useConfirmModal } from "@/atoms/confirmModal";
import { useDeleteAvatarFeedback } from "@/features/profile/hooks/feedbacks";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { TrashIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type LangLoader from "@/lib/LangLoader";

interface DeleteAvatarProps {
  currentImage?: string;
  ll: typeof LangLoader.prototype.deleteAvatar;
  llDeleteAvatarFeedback: typeof LangLoader.prototype.deleteAvatarFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const main = Effect.gen(function* () {
  const { deleteAvatar } = yield* RpcProfileClient;

  const result = yield* deleteAvatar().pipe(
    Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
  );
  return { ...initialFormState, ...result } as const;
});

export default function DeleteAvatar({ currentImage, ll, llDeleteAvatarFeedback, llFormToastFeedback }: DeleteAvatarProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // Deletes a user avatar, sets the user's image to null, and removes the corresponding avatar file from uploadthing
  const [deleteAvatarState, deleteAvatarAction, deleteAvatarIsPending] = useActionState(async () => await runRpcActionMain(main), {
    ...initialFormState,
    actionStatus: "idle",
  });

  // Provide feedback to the user regarding this server action
  useDeleteAvatarFeedback(deleteAvatarState, llDeleteAvatarFeedback, llFormToastFeedback);

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={!currentImage || deleteAvatarIsPending}
      onClick={() => {
        openConfirmModal({
          content: (
            <p className="text-center text-xl">
              {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["your avatar?"]}
            </p>
          ),
          onConfirmed: () => {
            startTransition(deleteAvatarAction);
          },
        });
      }}
    >
      {deleteAvatarIsPending ? <Loader2 className="size-9 animate-spin" /> : <TrashIcon className="size-9" />}
      {ll["Delete Avatar"]}
    </Button>
  );
}
