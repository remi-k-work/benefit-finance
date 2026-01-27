// react
import { Suspense } from "react";

// services, features, and other libraries
import LangLoader from "@/lib/LangLoader";

// components
import Header, { HeaderSkeleton } from "@/components/Header";
import { ConfirmModalRoot } from "@/atoms/confirmModal";
import { DemoModeModalRoot } from "@/atoms/demoModeModal";

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
  const { confirmModal, demoModeModal } = await LangLoader.create();

  return (
    <>
      <Header />
      <main className="mx-4 [grid-area:main]">{children}</main>
      <ConfirmModalRoot ll={confirmModal} />
      <DemoModeModalRoot ll={demoModeModal} />
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
