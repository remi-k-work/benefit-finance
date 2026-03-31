// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runPageMainOrNavigate } from "@/lib/helpersEffect";
import { Auth } from "@/features/auth/lib/auth";

// components
import ManagerModal from "@/components/ManagerModal";
import NewDocForm from "@/features/supportAgent/components/NewDocForm2";

// assets
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

const main = Effect.gen(function* () {
  // Verify if the current user possesses specific permissions
  const auth = yield* Auth;
  yield* auth.assertPermissions({ supportAgent: ["read"] });

  // Create an instance of the lang loader needed for localization
  const { supportAgent: ll, preferredLanguage, formToastFeedback } = yield* LangLoader.createEffect();

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
    <ManagerModal icon={<DocumentPlusIcon className="size-11 flex-none" />} title={ll["Support Agent ► New Document"]}>
      <NewDocForm preferredLanguage={preferredLanguage} ll={ll} llFormToastFeedback={formToastFeedback} />
    </ManagerModal>
  );
}
