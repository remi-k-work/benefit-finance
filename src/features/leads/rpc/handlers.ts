// drizzle and db access
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Effect, Layer } from "effect";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcLeads } from "./requests";
import { Auth } from "@/features/auth/lib/auth";

const RpcLeadsLayer = RpcLeads.toLayer({
  newLeadForm: ({ firstName, lastName, email, phone, serviceOfInterest }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ leads: ["create"] });

      // Access the user session data from the server side or fail with an unauthorized access error
      const {
        user: { id: referredBy },
      } = yield* auth.getUserSessionData;

      // Insert a new lead
      const leadDB = yield* LeadDB;
      yield* leadDB.insertLead({ referredBy, firstName, lastName, email, phone, serviceOfInterest });
    }),

  editLeadNotesForm: ({ leadId, internalNotes }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ leads: ["update"] });

      // Set lead internal notes
      const leadDB = yield* LeadDB;
      yield* leadDB.updateLead(leadId, { internalNotes: internalNotes === "" ? null : internalNotes });
    }),

  setLeadStatus: ({ leadId, newStatus }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ leads: ["update"] });

      // Set lead status
      const leadDB = yield* LeadDB;
      yield* leadDB.updateLead(leadId, { status: newStatus });

      // The action has completed successfully
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

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
}).pipe(Layer.provide(Auth.Default), Layer.provide(LeadDB.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcLeads, {
  layer: Layer.mergeAll(RpcLeadsLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
