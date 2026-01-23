// components
import PageHeader from "@/components/PageHeader";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Couples",
};

export default function Page() {
  return (
    <>
      <PageHeader title="Manage money together" description="Benefit Finance is a shared home for your finances by adding your partner for free" />
    </>
  );
}
