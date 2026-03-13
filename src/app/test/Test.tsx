"use client";

// react
import { startTransition, useActionState } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { runRpcActionMain } from "@/lib/helpersEffectClient";
import { initialFormState } from "@tanstack/react-form-nextjs";
import { RpcLeadsClient } from "@/features/leads/rpc/client";
import { useConfirmModal } from "@/atoms/confirmModal";
import { useDemoModeModal } from "@/atoms/demoModeModal";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { TrashIcon } from "@heroicons/react/24/outline";

const main = Effect.gen(function* () {
  const { deleteLead } = yield* RpcLeadsClient;

  const result = yield* deleteLead({ leadId: "1" }).pipe(
    Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
  );
  return { ...initialFormState, ...result } as const;
}).pipe(Effect.provide(RpcLeadsClient.Default));

export default function Test() {
  // Access the confirm modal context and retrieve all necessary information
  const { openConfirmModal } = useConfirmModal();
  const { openDemoModeModal } = useDemoModeModal();

  const [deleteLeadState, deleteLeadAction, deleteLeadIsPending] = useActionState(async () => await runRpcActionMain(main), {
    ...initialFormState,
    actionStatus: "idle",
  });

  console.log("deleteLeadState", deleteLeadState);

  return (
    <>
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
      <Button type="button" disabled={deleteLeadIsPending} onClick={() => startTransition(deleteLeadAction)}>
        Test RPC
      </Button>
    </>
  );
}
