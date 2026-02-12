// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { MessageResponse } from "@/components/ai-elements/custom/message";

// types
interface ChunkPreviewProps {
  chunkIndex: number;
  docChunk: AllDocsWithChunks["docChunks"][number];
}

export default function ChunkPreview({ chunkIndex, docChunk: { chunk } }: ChunkPreviewProps) {
  return (
    <Card className="shrink-0 grow-0 basis-[65ch]">
      <CardHeader className="from-card via-secondary to-card bg-linear-to-r p-3">
        <CardTitle>{`Chunk ${chunkIndex + 1}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <MessageResponse>{chunk}</MessageResponse>
      </CardContent>
    </Card>
  );
}
