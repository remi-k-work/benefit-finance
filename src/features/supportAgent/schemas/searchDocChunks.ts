// services, features, and other libraries
import { z } from "zod";

const SimilaritySchema = z
  .number()
  .min(0)
  .max(1)
  .describe("A score from 0.0 to 1.0 indicating how relevant the chunk is to the user's question. Higher is better.");

export const InputSchema = z
  .object({
    question: z
      .string()
      .trim()
      .min(1)
      .describe("The user's complete, original question. This is used to find the most relevant information within available documents."),
  })
  .describe("The input parameters for the `searchDocChunks` tool.");

export const OutputSchema = z
  .object({
    output: z
      .array(
        z.object({
          docId: z.uuid().describe("The unique ID of the source document."),
          docTitle: z.string().trim().min(1).max(50).describe("The title of the source document."),
          docMeta: z.record(z.string(), z.string()).nullable().describe("Stores metadata like the source filename, e.g. {'source': 'faq.md'}."),
          chunk: z.string().trim().min(1).describe("The relevant snippet of text from the document."),
          similarity: SimilaritySchema,
        }),
      )
      .describe("An array of relevant document chunks found, ordered from most to least relevant."),
  })
  .describe("The output of the `searchDocChunks` tool.");
