/* eslint-disable react/no-children-prop */

"use client";

// react
import { useActionState } from "react";

// services, features, and other libraries
import { Effect, Schema } from "effect";
import { formDataToRecord, runRpcActionMain } from "@/lib/helpersEffectClient";
import { RpcProfileClient } from "@/features/profile/rpc/client";
import { initialFormState, mergeForm, useTransform } from "@tanstack/react-form-nextjs";
import { useAppForm } from "@/components/Form";
import { ProfileDetailsFormSchemaEn, ProfileDetailsFormSchemaPl } from "@/features/profile/schemas";
import { useProfileDetailsFormFeedback } from "@/features/profile/hooks/feedbacks";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { UserAvatar } from "@/components/Avatar/User";
import UploadAvatar from "./UploadAvatar";
import DeleteAvatar from "./DeleteAvatar";
import InfoLine from "@/components/Form/InfoLine";

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

// constants
import { FORM_OPTIONS_PD, INITIAL_FORM_STATE_PD } from "@/features/profile/constants";

const main = (formDataRecord: Record<string, string>) =>
  Effect.gen(function* () {
    const { profileDetailsForm } = yield* RpcProfileClient;

    const result = yield* profileDetailsForm({ formDataRecord }).pipe(
      Effect.catchAllDefect(() => Effect.succeed({ ...initialFormState, actionStatus: "failed", timestamp: Date.now() } as const)),
    );
    return { ...initialFormState, ...result } as const;
  });

export default function ProfileDetailsForm({
  user,
  user: { name: currentName, image: currentImage },
  session,
  preferredLanguage,
  ll,
  llUploadAvatar,
  llDeleteAvatar,
  llDeleteAvatarFeedback,
  llProfileDetailsFormFeedback,
  llFormToastFeedback,
}: ProfileDetailsFormProps) {
  // The main server action that processes the form
  const [formState, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => await runRpcActionMain(main(formDataToRecord(formData))),
    INITIAL_FORM_STATE_PD,
  );

  const { AppField, AppForm, FormSubmit, handleSubmit, reset, store } = useAppForm({
    ...FORM_OPTIONS_PD,
    defaultValues: { ...FORM_OPTIONS_PD.defaultValues, name: currentName },
    transform: useTransform((baseForm) => mergeForm(baseForm, formState), [formState]),
  });

  // Provide feedback to the user regarding this form actions
  const { feedbackMessage, hideFeedbackMessage } = useProfileDetailsFormFeedback(formState, reset, store, llProfileDetailsFormFeedback, llFormToastFeedback);

  return (
    <AppForm>
      <form
        action={formAction}
        onSubmit={async () => {
          await handleSubmit();
        }}
      >
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
                  currentImage={currentImage ?? undefined}
                  ll={llDeleteAvatar}
                  llDeleteAvatarFeedback={llDeleteAvatarFeedback}
                  llFormToastFeedback={llFormToastFeedback}
                />
              </div>
            </div>
            <AppField
              name="name"
              validators={{
                onChange: Schema.standardSchemaV1(preferredLanguage === "en" ? ProfileDetailsFormSchemaEn.fields.name : ProfileDetailsFormSchemaPl.fields.name),
              }}
              children={(field) => (
                <field.TextField label={ll["Name"]} size={40} maxLength={26} spellCheck={false} autoComplete="name" placeholder={ll["e.g. John Doe"]} />
              )}
            />
          </CardContent>
          <CardFooter>
            <InfoLine message={feedbackMessage} />
            <FormSubmit
              submitIcon={<PencilSquareIcon className="size-9" />}
              submitText={ll["Change Name"]}
              resetText={ll["Clear Form"]}
              cancelText={ll["Cancel and Go Back"]}
              isPending={isPending}
              showCancel={false}
              onClearedForm={hideFeedbackMessage}
            />
          </CardFooter>
        </Card>
      </form>
    </AppForm>
  );
}
