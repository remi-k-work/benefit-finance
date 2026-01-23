// components
import PageHeader from "@/components/PageHeader";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Investing",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Invest with intention"
        description="See your portfolio clearly with AI that shows how you’re invested and what it means for your future"
      />
    </>
  );
}
