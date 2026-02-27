// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";

// components
import ManagerModal from "@/components/ManagerModal";
import NewLeadForm from "@/features/leads/components/NewLeadForm";

// assets
import { UserPlusIcon } from "@heroicons/react/24/outline";

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  yield* getUserSessionData;

  // Create an instance of the lang loader needed for localization
  const { leads: ll, preferredLanguage, formToastFeedback } = yield* LangLoader.createEffect();

  return { ll, preferredLanguage, formToastFeedback };
});

// Page remains the fast, static shell
export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function PageContent() {
  // Execute the main effect for the page, map known errors to the subsequent navigation helpers, and return the payload
  const { ll, preferredLanguage, formToastFeedback } = await runPageMainOrNavigate(main);

  return (
    <ManagerModal icon={<UserPlusIcon className="size-11 flex-none" />} title={ll["Leads ► New Lead"]}>
      <NewLeadForm preferredLanguage={preferredLanguage} ll={ll} llFormToastFeedback={formToastFeedback} />
    </ManagerModal>
  );
}
