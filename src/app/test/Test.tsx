"use client";

// react
import { startTransition, useActionState } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { RpcAuthClient } from "@/features/leads/rpc/client";
import { RuntimeClient } from "@/lib/RuntimeClient";
import { useConfirmModal } from "@/atoms/confirmModal";
import { useDemoModeModal } from "@/atoms/demoModeModal";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { TrashIcon } from "@heroicons/react/24/outline";

const main = Effect.gen(function* () {
  const client = yield* RpcAuthClient;

  //   👇 `boolean` (as defined in `Rpc.make`)
  return yield* client
    .SignUpRequest({
      email: "",
      password: "test",
    })
    .pipe(
      Effect.tapErrorTag("RequestError", (requestError) => {
        return Effect.log(requestError.errorMessage);
      }),
    );
}).pipe(Effect.provide(RpcAuthClient.Default));

export default function Test() {
  // Access the confirm modal context and retrieve all necessary information
  const { openConfirmModal } = useConfirmModal();
  const { openDemoModeModal } = useDemoModeModal();

  const [result, signUpRequest, isPending] = useActionState(async () => {
    const result = await RuntimeClient.runPromise(main);
    return result;
  }, null);

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
      <Button type="button" disabled={isPending} onClick={() => startTransition(signUpRequest)}>
        Test RPC
      </Button>
    </>
  );
}
