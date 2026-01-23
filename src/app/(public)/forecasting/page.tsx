// components
import PageHeader from "@/components/PageHeader";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Forecasting",
};

export default function Page() {
  return (
    <>
      <PageHeader title="Forecast your future" description="Get clear on your future and see how major life events can shape your money over time" />
    </>
  );
}
