// drizzle and db access
import { AvatarDB } from "@/features/profile/db";

// services, features, and other libraries
import { Effect, Layer } from "effect";
import LangLoader from "@/lib/LangLoader";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcProfile } from "./requests";
import { Auth } from "@/features/auth/lib/auth";
import { recordToFormData } from "@/lib/helpersEffectClient";
import {
  SERVER_VALIDATE_CHANGE_EN_PC,
  SERVER_VALIDATE_CHANGE_PL_PC,
  SERVER_VALIDATE_EN_EC,
  SERVER_VALIDATE_EN_PD,
  SERVER_VALIDATE_PL_EC,
  SERVER_VALIDATE_PL_PD,
  SERVER_VALIDATE_SETUP_EN_PC,
  SERVER_VALIDATE_SETUP_PL_PC,
} from "@/features/profile/constants";

const RpcProfileLayer = RpcProfile.toLayer({
  deleteAvatar: () =>
    Effect.gen(function* () {
      // Access the user session data from the server side or fail with an unauthorized access error
      const auth = yield* Auth;
      const {
        user: { id: userId },
      } = yield* auth.getUserSessionData;

      // Assert that the current user has at least one of the allowed roles
      yield* auth.assertRoles(["user", "admin"]);

      // Update the user information through the better-auth api by setting their image to null
      yield* auth.deleteImage;

      // Obtain the avatar file key for a user, which is unique to their avatar file in uploadthing
      const avatarDB = yield* AvatarDB;
      const avatarFileKey = yield* avatarDB.getAvatarFileKey(userId);

      // Delete the old avatar file from uploadthing
      if (avatarFileKey) yield* avatarDB.deleteOldAvatar(avatarFileKey.fileKey);

      // Delete an avatar for a user
      yield* avatarDB.deleteAvatar(userId);

      // The action has completed successfully
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

  emailChangeForm: ({ formDataRecord }) =>
    Effect.gen(function* () {
      // Access the user session data from the server side or fail with an unauthorized access error
      const auth = yield* Auth;
      const {
        user: { emailVerified },
      } = yield* auth.getUserSessionData;

      // Assert that the current user has at least one of the allowed roles
      yield* auth.assertRoles(["user", "admin"]);

      // Create an instance of the lang loader needed for localization
      const { preferredLanguage } = yield* LangLoader.createEffect();

      // Validate the form on the server side and extract needed data
      const formData = recordToFormData(formDataRecord);
      const { newEmail } = preferredLanguage === "en" ? yield* SERVER_VALIDATE_EN_EC(formData) : yield* SERVER_VALIDATE_PL_EC(formData);

      // Only users with verified emails need to additionally approve their email change
      const needsApproval = emailVerified;

      // Request the email change through the better-auth api for the user
      yield* auth.changeEmail(newEmail, needsApproval);

      // The form has successfully validated and submitted!
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

  passChangeForm: ({ hasCredential, formDataRecord }) =>
    Effect.gen(function* () {
      // Assert that the current user has at least one of the allowed roles
      const auth = yield* Auth;
      yield* auth.assertRoles(["user", "admin"]);

      // Create an instance of the lang loader needed for localization
      const { preferredLanguage } = yield* LangLoader.createEffect();

      // Validate the form on the server side and extract needed data
      let currentPassword: string | undefined, newPassword: string;
      const formData = recordToFormData(formDataRecord);
      if (hasCredential)
        ({ currentPassword, newPassword } =
          preferredLanguage === "en" ? yield* SERVER_VALIDATE_CHANGE_EN_PC(formData) : yield* SERVER_VALIDATE_CHANGE_PL_PC(formData));
      else ({ newPassword } = preferredLanguage === "en" ? yield* SERVER_VALIDATE_SETUP_EN_PC(formData) : yield* SERVER_VALIDATE_SETUP_PL_PC(formData));

      // Setup or change the password through the better-auth api for the user
      yield* auth.setupOrChangePassword(newPassword, currentPassword);

      // The form has successfully validated and submitted!
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

  profileDetailsForm: ({ formDataRecord }) =>
    Effect.gen(function* () {
      // Assert that the current user has at least one of the allowed roles
      const auth = yield* Auth;
      yield* auth.assertRoles(["user", "admin"]);

      // Create an instance of the lang loader needed for localization
      const { preferredLanguage } = yield* LangLoader.createEffect();

      // Validate the form on the server side and extract needed data
      const formData = recordToFormData(formDataRecord);
      const { name } = preferredLanguage === "en" ? yield* SERVER_VALIDATE_EN_PD(formData) : yield* SERVER_VALIDATE_PL_PD(formData);

      // Update the user information through the better-auth api by setting their name
      yield* auth.updateName(name);

      // The form has successfully validated and submitted!
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

  signOutEverywhere: () =>
    Effect.gen(function* () {
      // Access the user session data from the server side or fail with an unauthorized access error
      const auth = yield* Auth;
      yield* auth.getUserSessionData;

      // Sign the user out from all devices through the better-auth api
      yield* auth.revokeSessions;

      // The action has completed successfully
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),
}).pipe(Layer.provide(Auth.Default), Layer.provide(AvatarDB.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcProfile, {
  layer: Layer.mergeAll(RpcProfileLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
