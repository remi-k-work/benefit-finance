// services, features, and other libraries
import { Data, Effect } from "effect";
import { google } from "@ai-sdk/google";
import { embed, embedMany } from "ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Define a domain error for the ai sdk
class AiSdkError extends Data.TaggedError("AiSdkError")<{ readonly message: string; readonly cause?: unknown }> {}

// Initialize our embedding model
const model = google.embedding("gemini-embedding-001");

// A single, structure-aware splitter for all documents
const markdownSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", { chunkSize: 1000, chunkOverlap: 200 });

// Parse document content into smaller chunks for similarity search and retrieval
const generateDocChunks = (docContent: string) => Effect.promise(() => markdownSplitter.splitText(docContent));

// Embed many values at once (batch embedding); in other words, create embeddings for all document chunks
const embedManyDocChunks = (docChunks: string[]) =>
  Effect.tryPromise({
    try: () => embedMany({ model, values: docChunks, providerOptions: { google: { outputDimensionality: 1536 } } }),
    catch: (cause) => new AiSdkError({ message: "Failed to embed document chunks", cause }),
  });

// Create an embedding for a single value, in this case the user's question
const embedQuestion = (question: string) =>
  Effect.tryPromise({
    try: () => embed({ model, value: question, providerOptions: { google: { outputDimensionality: 1536 } } }),
    catch: (cause) => new AiSdkError({ message: "Failed to embed question", cause }),
  });

// Generate embeddings for a document
export const generateDocEmbeddings = (docContent: string) =>
  Effect.gen(function* () {
    // Parse document content into smaller chunks for similarity search and retrieval
    const docChunks = yield* generateDocChunks(docContent);

    // Embed many values at once (batch embedding); in other words, create embeddings for all document chunks
    const { embeddings } = yield* embedManyDocChunks(docChunks);

    // Return document chunks and their corresponding embeddings following the same naming convention as our "sup_agent_chunk" database table
    return embeddings.map((embedding, index) => ({ chunk: docChunks[index], embedding }));
  });

// Create an embedding vector for the user's question
export const generateQuestionEmbedding = (question: string) =>
  Effect.gen(function* () {
    // Create an embedding for a single value, in this case the user's question
    const { embedding } = yield* embedQuestion(question);

    // Return the embedding
    return embedding;
  });
