// drizzle and db access
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect, Layer } from "effect";
import LangLoader from "@/lib/LangLoader";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcLeads } from "./requests";
import { Auth } from "@/features/auth/lib/auth";
import { SERVER_VALIDATE_EN, SERVER_VALIDATE_PL } from "@/features/leads/constants/editLeadNotesForm";
import { recordToFormData } from "@/lib/helpersEffectClient";

const RpcLeadsLayer = RpcLeads.toLayer({
  deleteLead: ({ leadId }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ leads: ["delete"] });

      // Permanently delete a lead from the database
      const leadDB = yield* LeadDB;
      yield* leadDB.deleteLead(leadId);

      // The action has completed successfully
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

  editLeadNotesForm: ({ leadId, formDataRecord }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ leads: ["update"] });

      // Create an instance of the lang loader needed for localization
      const { preferredLanguage } = yield* LangLoader.createEffect();

      // Validate the form on the server side and extract needed data
      const formData = recordToFormData(formDataRecord);
      const { internalNotes } = preferredLanguage === "en" ? yield* SERVER_VALIDATE_EN(formData) : yield* SERVER_VALIDATE_PL(formData);

      // Set lead internal notes
      const leadDB = yield* LeadDB;
      yield* leadDB.updateLead(leadId, { internalNotes: internalNotes === "" ? null : internalNotes });

      // The form has successfully validated and submitted!
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),
}).pipe(Layer.provide(Auth.Default), Layer.provide(LeadDB.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcLeads, {
  layer: Layer.mergeAll(RpcLeadsLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
