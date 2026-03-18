// react
import { Suspense } from "react";

// next
import { redirect } from "next/navigation";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";
import { Auth } from "@/features/auth/lib/auth";

// components
import Header, { HeaderSkeleton } from "@/components/Header";
import { ConfirmModalRoot } from "@/atoms/confirmModal";
import { DemoModeModalRoot } from "@/atoms/demoModeModal";
import { SupportAgentModalRoot } from "@/atoms/supportAgentModal";

const main = Effect.gen(function* () {
  // Only check if the current user is authenticated (the check runs on the server side)
  const auth = yield* Auth;
  return yield* auth.getUserSessionData.pipe(
    Effect.as(true),
    Effect.orElse(() => Effect.succeed(false)),
  );
});

// Layout remains the fast, static shell
export default function Layout(props: LayoutProps<"/">) {
  return (
    <Suspense fallback={<LayoutSkeleton {...props} />}>
      <LayoutContent {...props} />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function LayoutContent({ children }: LayoutProps<"/">) {
  // Execute the main effect for the component, handle known errors, and return the payload
  const isAuthenticated = await runComponentMain(main);

  // If the current user is authenticated, redirect to the dashboard
  if (isAuthenticated) redirect("/dashboard");

  // Create an instance of the lang loader needed for localization
  const { preferredLanguage, confirmModal, demoModeModal, supportAgent } = await LangLoader.create();

  return (
    <>
      <Header />
      <main className="mx-4 [grid-area:main]">{children}</main>
      <ConfirmModalRoot ll={confirmModal} />
      <DemoModeModalRoot ll={demoModeModal} />
      <SupportAgentModalRoot preferredLanguage={preferredLanguage} ll={supportAgent} />
    </>
  );
}

function LayoutSkeleton({ children }: LayoutProps<"/">) {
  return (
    <>
      <HeaderSkeleton />
      <main className="mx-4 [grid-area:main]">{children}</main>
    </>
  );
}
