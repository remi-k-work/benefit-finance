// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { useInstanceContext } from "@/features/supportAgent/components/DocsWithChunksTable/context";

// components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { MessageResponse } from "@/components/ai-elements/custom/message";
import DateTimeAt from "@/components/DateTimeAt";
import ChunkPreview from "./ChunkPreview";

// assets
import { CalendarIcon } from "@heroicons/react/24/outline";

// types
interface DocPreviewProps {
  docWithChunks: AllDocsWithChunks;
}

export default function DocPreview({ docWithChunks: { id, title, content, createdAt, updatedAt, docChunks } }: DocPreviewProps) {
  // Access the table context and retrieve all necessary information
  const { ll } = useInstanceContext();

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
          <DateTimeAt icon={<CalendarIcon className="size-9" />} title={ll["Created At"]} date={createdAt} />
          <DateTimeAt icon={<CalendarIcon className="size-9" />} title={ll["Updated At"]} date={updatedAt} />
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
