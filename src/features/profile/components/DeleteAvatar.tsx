// services, features, and other libraries
import { Effect } from "effect";
import { useAtom } from "@effect-atom/atom-react";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form/hooks";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { useConfirmModal } from "@/atoms/confirmModal";

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

const deleteAvatarActionAtom = RuntimeAtom.fn(
  Effect.fnUntraced(function* () {
    const { deleteAvatar } = yield* RpcProfileClient;
    yield* deleteAvatar();
  }),
);

export default function DeleteAvatar({ currentImage, ll, llDeleteAvatarFeedback, llFormToastFeedback }: DeleteAvatarProps) {
  // This is the hook that components use to open the modal
  const { openConfirmModal } = useConfirmModal();

  // Deletes a user avatar, sets the user's image to null, and removes the corresponding avatar file from uploadthing
  const [deleteAvatarResult, deleteAvatarAction] = useAtom(deleteAvatarActionAtom);

  // Provide feedback to the user regarding this server action
  useSubmitToast(
    deleteAvatarActionAtom,
    llFormToastFeedback,
    llDeleteAvatarFeedback["[PROFILE DETAILS]"],
    llDeleteAvatarFeedback["Your avatar has been deleted."],
    llDeleteAvatarFeedback["Your avatar could not be deleted; please try again later."],
    undefined,
    true,
  );

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={!currentImage || deleteAvatarResult.waiting}
      onClick={() => {
        openConfirmModal({
          content: (
            <p className="text-center text-xl">
              {ll["Are you sure you want to"]} <b className="text-destructive">{ll["delete"]}</b> {ll["your avatar?"]}
            </p>
          ),
          onConfirmed: () => {
            deleteAvatarAction();
          },
        });
      }}
    >
      {deleteAvatarResult.waiting ? <Loader2 className="size-9 animate-spin" /> : <TrashIcon className="size-9" />}
      {ll["Delete Avatar"]}
    </Button>
  );
}
