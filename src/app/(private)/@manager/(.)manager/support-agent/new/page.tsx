// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { getUserSessionData } from "@/features/auth/lib/helpersEffect";
import { UnauthorizedAccessError } from "@/lib/errors";

// components
import ManagerModal from "@/components/ManagerModal";
import NewDocForm from "@/features/supportAgent/components/NewDocForm";

// assets
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

const main = Effect.gen(function* () {
  // Access the user session data from the server side or fail with an unauthorized access error
  const {
    user: { role },
  } = yield* getUserSessionData;
  if (role !== "admin") return yield* new UnauthorizedAccessError({ message: "Unauthorized access" });

  // Create an instance of the lang loader needed for localization
  const { manSupportAgentPage: ll, preferredLanguage, manSupportAgent, formToastFeedback } = yield* LangLoader.createEffect();

  return { ll, preferredLanguage, manSupportAgent, formToastFeedback };
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
  const { ll, preferredLanguage, manSupportAgent, formToastFeedback } = await runPageMainOrNavigate(main);

  return (
    <ManagerModal icon={<DocumentPlusIcon className="size-11 flex-none" />} title={ll["Support Agent ► New Document"]}>
      <NewDocForm preferredLanguage={preferredLanguage} ll={manSupportAgent} llFormToastFeedback={formToastFeedback} />
    </ManagerModal>
  );
}
