// drizzle and db access
import { LeadDB } from "@/features/leads/db";

// services, features, and other libraries
import { Console, Effect, Layer } from "effect";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcLeads } from "./requests";
import { Auth } from "@/features/auth/lib/auth";

const RpcLeadsLayer = RpcLeads.toLayer({
  deleteLead: ({ leadId }) =>
    Effect.gen(function* () {
      // *** TEST CODE ***
      // *** TEST CODE ***
      // *** TEST CODE ***
      yield* Console.log(leadId);
      // *** TEST CODE ***
      // *** TEST CODE ***
      // *** TEST CODE ***
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
