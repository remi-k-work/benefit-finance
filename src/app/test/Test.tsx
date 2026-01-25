"use client";

// services, features, and other libraries
import { useConfirmModal } from "@/atoms/confirmModal";
import { useDemoModeModal } from "@/atoms/demoModeModal";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Test() {
  // Access the confirm modal context and retrieve all necessary information
  const { openConfirmModal } = useConfirmModal();
  const { openDemoModeModal } = useDemoModeModal();

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={() => {
        openConfirmModal({
          content: (
            <p className="text-center text-xl">
              Are you sure you want to <b className="text-destructive">delete</b> your avatar?
            </p>
          ),
          onConfirmed: () => openDemoModeModal(),
        });
      }}
    >
      <TrashIcon className="size-9" />
      Delete Avatar
    </Button>
  );
}
