"use client";

// react
import { useMemo } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import { useAtomSet } from "@effect-atom/atom-react";
import { FormReact } from "@lucas-barake/effect-form-react";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { profileDetailsFormBuilder } from "@/features/profile/schemas";
import { RuntimeAtom } from "@/lib/RuntimeClient";
import { useSubmitToast } from "@/components/Form2/hooks";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { TextInput } from "@/components/Form2/Inputs";
import { FormSubmit, SubmitStatus } from "@/components/Form2";
import { UserAvatar } from "@/components/Avatar/User";
import UploadAvatar from "./UploadAvatar";
import DeleteAvatar from "./DeleteAvatar";

// assets
import { PencilSquareIcon } from "@heroicons/react/24/outline";

// types
import type { Session, User } from "@/services/better-auth/auth";
import type { Lang } from "@/lib/LangLoader";
import type LangLoader from "@/lib/LangLoader";

interface ProfileDetailsFormProps {
  user: User;
  session: Session;
  preferredLanguage: Lang;
  ll: typeof LangLoader.prototype.profileDetailsForm;
  llUploadAvatar: typeof LangLoader.prototype.uploadAvatar;
  llDeleteAvatar: typeof LangLoader.prototype.deleteAvatar;
  llDeleteAvatarFeedback: typeof LangLoader.prototype.deleteAvatarFeedback;
  llProfileDetailsFormFeedback: typeof LangLoader.prototype.profileDetailsFormFeedback;
  llFormToastFeedback: typeof LangLoader.prototype.formToastFeedback;
}

const profileDetailsForm = (preferredLanguage: Lang) =>
  FormReact.make(profileDetailsFormBuilder(preferredLanguage), {
    runtime: RuntimeAtom,
    fields: { name: TextInput },
    onSubmit: (_, { decoded: { name } }) =>
      Effect.gen(function* () {
        const { profileDetailsForm } = yield* RpcProfileClient;
        yield* profileDetailsForm({ name });
      }),
  });

export default function ProfileDetailsForm({
  user,
  user: { name, image },
  session,
  preferredLanguage,
  ll,
  llUploadAvatar,
  llDeleteAvatar,
  llDeleteAvatarFeedback,
  llProfileDetailsFormFeedback,
  llFormToastFeedback,
}: ProfileDetailsFormProps) {
  // Get the form context
  const profileDetailsFormL = useMemo(() => profileDetailsForm(preferredLanguage), [preferredLanguage]);
  const submit = useAtomSet(profileDetailsFormL.submit);

  // Provide feedback to the user regarding this form actions
  useSubmitToast(
    profileDetailsFormL,
    llFormToastFeedback,
    llProfileDetailsFormFeedback["[PROFILE DETAILS]"],
    llProfileDetailsFormFeedback["Your profile details have been updated."],
    undefined,
    undefined,
    true,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Profile Details"]}</CardTitle>
        <CardDescription>{ll["Change your avatar and name"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap items-center justify-around gap-4 sm:justify-between">
          <UserAvatar user={user} session={session} />
          <div className="grid gap-4">
            <UploadAvatar ll={llUploadAvatar} />
            <DeleteAvatar
              currentImage={image ?? undefined}
              ll={llDeleteAvatar}
              llDeleteAvatarFeedback={llDeleteAvatarFeedback}
              llFormToastFeedback={llFormToastFeedback}
            />
          </div>
        </div>
        <profileDetailsFormL.Initialize defaultValues={{ name }}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              submit();
            }}
          >
            <profileDetailsFormL.name label={ll["Name"]} size={40} maxLength={26} spellCheck={false} autoComplete="name" placeholder={ll["e.g. John Doe"]} />
            <br />
            <SubmitStatus
              form={profileDetailsFormL}
              ll={llFormToastFeedback}
              formName={llProfileDetailsFormFeedback["[PROFILE DETAILS]"]}
              succeededDesc={llProfileDetailsFormFeedback["Your profile details have been updated."]}
            />
            <FormSubmit
              form={profileDetailsFormL}
              submitIcon={<PencilSquareIcon className="size-9" />}
              submitText={ll["Change Name"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              showCancel={false}
            />
          </form>
        </profileDetailsFormL.Initialize>
      </CardContent>
    </Card>
  );
}
