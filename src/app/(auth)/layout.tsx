// react
import { Suspense } from "react";

// next
import { redirect } from "next/navigation";

// services, features, and other libraries
import LangLoader from "@/lib/LangLoader";
import { isUserAuthenticated } from "@/features/auth/lib/helpers";

// components
import Header, { HeaderSkeleton } from "@/components/Header";
import { ConfirmModalRoot } from "@/atoms/confirmModal";
import { DemoModeModalRoot } from "@/atoms/demoModeModal";
import { SupportAgentModalRoot } from "@/atoms/supportAgentModal";

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
  // Create an instance of the lang loader needed for localization
  const { preferredLanguage, confirmModal, demoModeModal, supportAgentModal } = await LangLoader.create();

  // Only check if the current user is authenticated (the check runs on the server side)
  const isAuthenticated = await isUserAuthenticated();

  // If the current user is authenticated, redirect to the dashboard
  if (isAuthenticated) redirect("/dashboard");

  return (
    <>
      <Header />
      <main className="mx-4 [grid-area:main]">{children}</main>
      <ConfirmModalRoot ll={confirmModal} />
      <DemoModeModalRoot ll={demoModeModal} />
      <SupportAgentModalRoot preferredLanguage={preferredLanguage} ll={supportAgentModal} />
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
