// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { runComponentMain } from "@/lib/helpersEffect";
import { Auth } from "@/features/auth/lib/auth";

// types
import type { ReactNode } from "react";

interface AdminOnlyProps {
  children: ReactNode;
}

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const auth = yield* Auth;
  const { user } = yield* auth.getUserSessionData.pipe(Effect.orElse(() => Effect.succeed({ user: null, session: null })));

  return user?.role === "admin";
});

// Component remains the fast, static shell
export default function AdminOnly({ children }: AdminOnlyProps) {
  return (
    <Suspense>
      <AdminOnlyContent>{children}</AdminOnlyContent>
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function AdminOnlyContent({ children }: AdminOnlyProps) {
  // Execute the main effect for the component, handle known errors, and return the payload
  const isAdmin = await runComponentMain(main);

  return isAdmin ? <>{children}</> : null;
}
