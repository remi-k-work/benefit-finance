// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { getUserSessionData, hasCredentialAccount } from "@/features/auth/lib/helpersEffect";

// components
import PageHeader, { PageHeaderSkeleton } from "@/components/PageHeader";
import ProfileDetailsForm from "@/features/profile/components/ProfileDetailsForm";
import EmailChangeForm from "@/features/profile/components/EmailChangeForm";
import PassChangeForm from "@/features/profile/components/PassChangeForm";
import SignOutEverywhere from "@/features/profile/components/SignOutEverywhere";

// types
import type { Metadata } from "next";

// constants
export const metadata: Metadata = {
  title: "Benefit Finance ► Profile",
};

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const { user, session } = yield* getUserSessionData;

  // Determine whether the current user has any "credential" type accounts
  const hasCredential = yield* hasCredentialAccount;

  // Create an instance of the lang loader needed for localization
  const {
    profilePage: ll,
    preferredLanguage,
    profileDetailsForm,
    uploadAvatar,
    deleteAvatar,
    deleteAvatarFeedback,
    profileDetailsFormFeedback,
    formToastFeedback,
    emailChangeForm,
    emailChangeFormFeedback,
    passChangeForm,
    passChangeFormFeedback,
    signOutEverywhere,
    signOutEverywhereFeedback,
  } = yield* LangLoader.createEffect();

  return {
    user,
    session,
    hasCredential,
    ll,
    preferredLanguage,
    profileDetailsForm,
    uploadAvatar,
    deleteAvatar,
    deleteAvatarFeedback,
    profileDetailsFormFeedback,
    formToastFeedback,
    emailChangeForm,
    emailChangeFormFeedback,
    passChangeForm,
    passChangeFormFeedback,
    signOutEverywhere,
    signOutEverywhereFeedback,
  };
});

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
  // Execute the main effect for the page, map known errors to the subsequent navigation helpers, and return the payload
  const {
    user,
    session,
    hasCredential,
    ll,
    preferredLanguage,
    profileDetailsForm,
    uploadAvatar,
    deleteAvatar,
    deleteAvatarFeedback,
    profileDetailsFormFeedback,
    formToastFeedback,
    emailChangeForm,
    emailChangeFormFeedback,
    passChangeForm,
    passChangeFormFeedback,
    signOutEverywhere,
    signOutEverywhereFeedback,
  } = await runPageMainOrNavigate(main);

  return (
    <>
      <PageHeader title={ll["Profile"]} description={ll["Below you can see and manage your profile"]} />
      <article className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProfileDetailsForm
          user={user}
          session={session}
          preferredLanguage={preferredLanguage}
          ll={profileDetailsForm}
          llUploadAvatar={uploadAvatar}
          llDeleteAvatar={deleteAvatar}
          llDeleteAvatarFeedback={deleteAvatarFeedback}
          llProfileDetailsFormFeedback={profileDetailsFormFeedback}
          llFormToastFeedback={formToastFeedback}
        />
        <EmailChangeForm
          user={user}
          preferredLanguage={preferredLanguage}
          ll={emailChangeForm}
          llEmailChangeFormFeedback={emailChangeFormFeedback}
          llFormToastFeedback={formToastFeedback}
        />
        <PassChangeForm
          key={hasCredential ? "[PASSWORD CHANGE]" : "[PASSWORD SETUP]"}
          hasCredential={hasCredential}
          preferredLanguage={preferredLanguage}
          ll={passChangeForm}
          llPassChangeFormFeedback={passChangeFormFeedback}
          llFormToastFeedback={formToastFeedback}
        />
        <SignOutEverywhere ll={signOutEverywhere} llSignOutEverywhereFeedback={signOutEverywhereFeedback} llFormToastFeedback={formToastFeedback} />
      </article>
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
    </>
  );
}
