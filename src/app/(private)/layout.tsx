// react
import { Suspense } from "react";

// services, features, and other libraries
import LangLoader from "@/lib/LangLoader";

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
async function LayoutContent({ leads, manager, children }: LayoutProps<"/">) {
  // Create an instance of the lang loader needed for localization
  const { preferredLanguage, confirmModal, demoModeModal, supportAgentModal } = await LangLoader.create();

  return (
    <>
      <Header />
      <main className="mx-4 [grid-area:main]">
        {children}
        {leads}
        {manager}
      </main>
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
