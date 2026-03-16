// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { SupAgentChunkDB, SupAgentDocDB } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect, Layer } from "effect";
import LangLoader from "@/lib/LangLoader";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcSupportAgent } from "./requests";
import { Auth } from "@/features/auth/lib/auth";
import { recordToFormData } from "@/lib/helpersEffectClient";
import { SERVER_VALIDATE_EN_E, SERVER_VALIDATE_EN_N, SERVER_VALIDATE_PL_E, SERVER_VALIDATE_PL_N } from "@/features/supportAgent/constants";
import { generateDocEmbeddings } from "@/features/supportAgent/lib/embeddings";

const RpcSupportAgentLayer = RpcSupportAgent.toLayer({
  newDocForm: ({ formDataRecord }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ supportAgent: ["create"] });

      // Create an instance of the lang loader needed for localization
      const { preferredLanguage } = yield* LangLoader.createEffect();

      // Validate the form on the server side and extract needed data
      const formData = recordToFormData(formDataRecord);
      const { title, content } = preferredLanguage === "en" ? yield* SERVER_VALIDATE_EN_N(formData) : yield* SERVER_VALIDATE_PL_N(formData);

      const db = yield* DB;
      const supAgentDocDB = yield* SupAgentDocDB;
      const supAgentChunkDB = yield* SupAgentChunkDB;

      // Generate embeddings for a document first; it is an external api call that may throw and is time-consuming (no db lock held)
      const docEmbeddings = yield* generateDocEmbeddings(content);

      // Run all db operations in a transaction
      yield* db.transaction(
        // Insert a new document, and insert multiple new chunks for a document
        supAgentDocDB.insertDoc({ title, content }).pipe(Effect.andThen(([{ id }]) => supAgentChunkDB.insertChunks(id, docEmbeddings))),
      );

      // The form has successfully validated and submitted!
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

  editDocForm: ({ docId, formDataRecord }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ supportAgent: ["update"] });

      // Create an instance of the lang loader needed for localization
      const { preferredLanguage } = yield* LangLoader.createEffect();

      // Validate the form on the server side and extract needed data
      const formData = recordToFormData(formDataRecord);
      const { title, content } = preferredLanguage === "en" ? yield* SERVER_VALIDATE_EN_E(formData) : yield* SERVER_VALIDATE_PL_E(formData);

      const db = yield* DB;
      const supAgentDocDB = yield* SupAgentDocDB;
      const supAgentChunkDB = yield* SupAgentChunkDB;

      // Generate embeddings for a document first; it is an external api call that may throw and is time-consuming (no db lock held)
      const docEmbeddings = yield* generateDocEmbeddings(content);

      // Run all db operations in a transaction
      yield* db.transaction(
        // Update a document, delete all chunks for a document, and insert multiple new chunks for a document
        supAgentDocDB
          .updateDoc(docId, { title, content })
          .pipe(Effect.andThen(supAgentChunkDB.deleteChunks(docId)), Effect.andThen(supAgentChunkDB.insertChunks(docId, docEmbeddings))),
      );

      // The form has successfully validated and submitted!
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),

  deleteDoc: ({ docId }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ supportAgent: ["delete"] });

      // Delete a document
      const supAgentDocDB = yield* SupAgentDocDB;
      yield* supAgentDocDB.deleteDoc(docId);

      // The action has completed successfully
      return { actionStatus: "succeeded", timestamp: Date.now() };
    }),
}).pipe(Layer.provide(Auth.Default), Layer.provide(DB.Default), Layer.provide(SupAgentDocDB.Default), Layer.provide(SupAgentChunkDB.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcSupportAgent, {
  layer: Layer.mergeAll(RpcSupportAgentLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
