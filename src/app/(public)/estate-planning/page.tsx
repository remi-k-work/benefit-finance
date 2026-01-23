// components
import PageHeader from "@/components/PageHeader";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Estate Planning",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="Everyone has something valuable to protect"
        description="We all hope to leave something for the next generation. Decide who gets what, when, and how by creating an estate plan with Benefit Finance"
      />
    </>
  );
}
