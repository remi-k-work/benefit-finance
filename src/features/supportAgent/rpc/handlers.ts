// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { SupAgentChunkDB, SupAgentDocDB } from "@/features/supportAgent/db";

// services, features, and other libraries
import { Effect, Layer } from "effect";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { HttpServer } from "@effect/platform";
import { RpcSupportAgent } from "./requests";
import { Auth } from "@/features/auth/lib/auth";
import { generateDocEmbeddings } from "@/features/supportAgent/lib/embeddings";

const RpcSupportAgentLayer = RpcSupportAgent.toLayer({
  newDocForm: ({ title, content }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ supportAgent: ["create"] });

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
    }),

  editDocForm: ({ docId, title, content }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ supportAgent: ["update"] });

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
    }),

  deleteDoc: ({ docId }) =>
    Effect.gen(function* () {
      // Verify if the current user possesses specific permissions
      const auth = yield* Auth;
      yield* auth.assertPermissions({ supportAgent: ["delete"] });

      // Delete a document
      const supAgentDocDB = yield* SupAgentDocDB;
      yield* supAgentDocDB.deleteDoc(docId);
    }),
}).pipe(Layer.provide(Auth.Default), Layer.provide(DB.Default), Layer.provide(SupAgentDocDB.Default), Layer.provide(SupAgentChunkDB.Default));

export const { dispose, handler } = RpcServer.toWebHandler(RpcSupportAgent, {
  layer: Layer.mergeAll(RpcSupportAgentLayer, RpcSerialization.layerNdjson, HttpServer.layerContext),
});
