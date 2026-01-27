"use client";

// react
import { useState } from "react";

// services, features, and other libraries
import { authClient } from "@/services/better-auth/auth-client";

// components
import { Button } from "@/components/ui/custom/button";
import { toast } from "sonner";

// assets
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type LangLoader from "@/lib/LangLoader";

interface SignOutProps {
  ll: typeof LangLoader.prototype.userPopover;
}

export default function SignOut({ ll }: SignOutProps) {
  // Whether or not the sign out request is pending
  const [isPending, setIsPending] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={isPending}
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onRequest: () => {
              setIsPending(true);
            },
            onSuccess: () => {
              setIsPending(false);
              window.location.href = "/";
            },
            onError: ({ error: { message } }) => {
              setIsPending(false);
              toast.error(ll["AUTHORIZATION ERROR!"], { description: message });
            },
          },
        });
      }}
    >
      {isPending ? <Loader2 className="size-9 animate-spin" /> : <ArrowRightStartOnRectangleIcon className="size-9" />}
      {ll["Sign Out"]}
    </Button>
  );
}
