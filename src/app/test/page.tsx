// react
import { Suspense } from "react";

// next
import { connection } from "next/server";

// components
import PageHeader from "@/components/PageHeader";
import Test from "./Test";

// constants
import { user, admin, demo } from "@/services/better-auth/permissions";

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

  console.log("user", user);
  console.log("admin", admin);
  console.log("demo", demo);

  return (
    <>
      <PageHeader title="Home" description="Welcome to Benefit Finance!" />
      <Test />
    </>
  );
}
