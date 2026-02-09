// drizzle and db access
import { DB } from "@/drizzle/dbEffect";
import { cosineDistance, desc, eq, gt, sql } from "drizzle-orm";

// all table definitions (their schemas)
import { SupAgentChunkTable, SupAgentDocTable } from "@/drizzle/schema";

// services, features, and other libraries
import { Effect } from "effect";
import { generateQuestionEmbedding } from "@/features/supportAgent/lib/embeddings";

// Search the agent's knowledge base for document chunks that are most relevant to the user's question
export const getInformation = (question: string, topK: number = 5, baseMinSimilarity: number = 0.5) =>
  Effect.gen(function* () {
    const { execute } = yield* DB;

    // Create an embedding vector for the user's question
    const questionEmbedding = yield* generateQuestionEmbedding(question);

    // Define the similarity calculation using drizzle's helper
    const similarity = sql<number>`1 - (${cosineDistance(SupAgentChunkTable.embedding, questionEmbedding)})`;

    // Query candidate chunks ordered by similarity (and apply a hard floor — discard "obviously irrelevant" chunks)
    const candidateChunks = yield* execute((dbOrTx) =>
      dbOrTx
        .select({
          docId: SupAgentChunkTable.docId,
          docTitle: SupAgentDocTable.title,
          docMeta: SupAgentDocTable.metadata,
          chunk: SupAgentChunkTable.chunk,
          similarity,
        })
        .from(SupAgentChunkTable)
        .innerJoin(SupAgentDocTable, eq(SupAgentChunkTable.docId, SupAgentDocTable.id))
        .where(gt(similarity, baseMinSimilarity))
        .orderBy(desc(similarity))
        .limit(topK),
    );

    if (candidateChunks.length === 0) return [];

    // Adaptive confidence logic
    const top = candidateChunks[0].similarity;

    // If the top result is strong, we accept it; we only focus on the margin if the results are mediocre (for example, between 0.5 and 0.6).
    if (top < 0.6) return [];

    // Return candidate chunks (confident case)
    return candidateChunks;
  });
