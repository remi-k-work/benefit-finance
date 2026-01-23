// react
import { Suspense } from "react";

// services, features, and other libraries
import { getUserSessionData, makeSureUserIsAuthenticated } from "@/features/auth/lib/helpers";

// components
import PageHeader from "@/components/PageHeader";
import ProfileInfo from "@/features/dashboard/components/ProfileInfo";
import VerifyEmail from "@/features/dashboard/components/VerifyEmail";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Dashboard",
};

// Page remains the fast, static shell
export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function PageContent() {
  // Make sure the current user is authenticated (the check runs on the server side)
  await makeSureUserIsAuthenticated();

  // Access the user session data from the server side
  const { user, session } = (await getUserSessionData())!;

  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back! Below is your account overview" />
      <article className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProfileInfo user={user} session={session} />
        <VerifyEmail user={user} />
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back! Below is your account overview" />
    </>
  );
}
