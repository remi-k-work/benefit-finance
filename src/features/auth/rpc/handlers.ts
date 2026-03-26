// services, features, and other libraries
import { Effect, Layer } from "effect";
import LangLoader from "@/lib/LangLoader";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcAuth } from "./requests";
import { Auth } from "@/features/auth/lib/auth";
import { recordToFormData } from "@/lib/helpersEffectClient";
import { SERVER_VALIDATE_EN_FP, SERVER_VALIDATE_PL_FP } from "@/features/auth/constants";

const RpcAuthLayer = RpcAuth.toLayer({
  forgotPassForm: ({ formDataRecord }) =>
    Effect.gen(function* () {
      // Create an instance of the lang loader needed for localization
      const { preferredLanguage } = yield* LangLoader.createEffect();

      // Validate the form on the server side and extract needed data
      const formData = recordToFormData(formDataRecord);
      const { email } = preferredLanguage === "en" ? yield* SERVER_VALIDATE_EN_FP(formData) : yield* SERVER_VALIDATE_PL_FP(formData);

      // Request the password reset through the better-auth api for the user
      const auth = yield* Auth;
      yield* auth.requestPasswordReset(email);

      // The form has successfully validated and submitted!
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

  resetPassForm: ({ token, newPassword }) =>
    Effect.gen(function* () {
      // Reset the password through the better-auth api for the user
      const auth = yield* Auth;
      yield* auth.resetPassword(token, newPassword);
    }),

  signInForm: ({ email, password, rememberMe }) =>
    Effect.gen(function* () {
      // Sign in the user through the better-auth api
      const auth = yield* Auth;
      yield* auth.signInEmail(email, password, rememberMe);
    }),

  signUpForm: ({ name, email, password }) =>
    Effect.gen(function* () {
      // Sign up the user through the better-auth api
      const auth = yield* Auth;
      yield* auth.signUpEmail(name, email, password);
    }),
}).pipe(Layer.provide(Auth.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcAuth, {
  layer: Layer.mergeAll(RpcAuthLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
