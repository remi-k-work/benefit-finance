// components
import PageHeader from "@/components/PageHeader";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Spending",
};

export default function Page() {
  return (
    <>
      <PageHeader title="Track your spending" description="See your spending clearly with AI that shows where your money goes, and what it means for you" />
    </>
  );
}
