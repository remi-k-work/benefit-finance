// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { MessageResponse } from "@/components/ai-elements/custom/message";
import CreatedAt from "@/features/manager/supportAgent/components/CreatedAt";
import UpdatedAt from "@/features/manager/supportAgent/components/UpdatedAt";
import ChunkPreview from "./ChunkPreview";

// types
interface DocPreviewProps {
  docWithChunks: AllDocsWithChunks;
}

export default function DocPreview({ docWithChunks: { id, title, content, createdAt, updatedAt, docChunks } }: DocPreviewProps) {
  return (
    <>
      <Card className="w-full max-w-none">
        <CardHeader className="from-card via-primary to-card bg-linear-to-r p-3">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <MessageResponse>{content}</MessageResponse>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-around gap-6 border-t pt-6">
          <CreatedAt createdAt={createdAt} />
          <UpdatedAt updatedAt={updatedAt} />
        </CardFooter>
      </Card>
      <br />
      <article className="flex gap-6 overflow-x-auto">
        {docChunks.map((docChunk, index) => (
          <ChunkPreview key={`${id}-${index}`} chunkIndex={index} docChunk={docChunk} />
        ))}
      </article>
    </>
  );
}
