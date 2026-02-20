"use client";

// react
import { useState } from "react";

// services, features, and other libraries
import { authClient } from "@/services/better-auth/auth-client";
import { getRandomInt } from "@/lib/helpers";

// components
import { Button } from "@/components/ui/custom/button";
import { toast } from "sonner";

// assets
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

// types
import type { Route } from "next";
import type LangLoader from "@/lib/LangLoader";

interface SignInDemoProps {
  redirect?: Route;
  ll: typeof LangLoader.prototype.signInDemo;
}

// constants
import { USERS } from "@/drizzle/seed/constants";

export default function SignInDemo({ redirect, ll }: SignInDemoProps) {
  // Whether or not the demo sign in request is pending
  const [isPending, setIsPending] = useState(false);

  // Filter only demo users, and pick a random one
  const demoUsers = USERS.filter((user) => user.role === "demo");
  const { email, password } = demoUsers[getRandomInt(0, demoUsers.length - 1)];

  return (
    <Button
      type="button"
      disabled={isPending}
      className="mx-auto"
      onClick={async () => {
        await authClient.signIn.email({
          email,
          password,
          rememberMe: false,
          callbackURL: redirect ?? "/dashboard",
          fetchOptions: {
            onRequest: () => {
              setIsPending(true);
            },
            onError: ({ error: { message } }) => {
              setIsPending(false);
              toast.error(ll["AUTHORIZATION ERROR!"], { description: message });
            },
          },
        });
      }}
    >
      {isPending ? <Loader2 className="size-9 animate-spin" /> : <ArrowRightEndOnRectangleIcon className="size-9" />}
      {ll["Sign In as a Demo User"]}
    </Button>
  );
}
