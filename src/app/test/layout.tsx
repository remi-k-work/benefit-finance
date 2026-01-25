// components
import Header from "@/components/Header";
import { ConfirmModalRoot } from "@/atoms/confirmModal";
import { DemoModeModalRoot } from "@/atoms/demoModeModal";

export default function Layout({ children }: LayoutProps<"/test">) {
  return (
    <>
      <Header />
      <main className="mx-4 [grid-area:main]">{children}</main>
      {/* Add the Reactive Root for the modal */}
      <ConfirmModalRoot />
      <DemoModeModalRoot />
    </>
  );
}
