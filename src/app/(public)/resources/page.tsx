// components
import PageHeader from "@/components/PageHeader";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Resources",
};

export default function Page() {
  return (
    <>
      <PageHeader title="Resources" description="Deep dives into personal finance" />
    </>
  );
}
