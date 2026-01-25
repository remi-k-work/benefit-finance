// react
import { Suspense } from "react";

// next
import { connection } from "next/server";

// components
import PageHeader from "@/components/PageHeader";
import Test from "./Test";

// Page remains the fast, static shell
export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}

async function PageContent() {
  // Explicitly defer to request time (Effect uses Date.now() internally)
  await connection();

  return (
    <>
      <PageHeader title="Home" description="Welcome to Benefit Finance!" />
      <Test />
    </>
  );
}
