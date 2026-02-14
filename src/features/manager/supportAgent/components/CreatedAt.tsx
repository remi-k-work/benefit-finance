// drizzle and db access
import type { AllDocsWithChunks } from "@/features/supportAgent/db";

// services, features, and other libraries
import { useInstanceContext } from "@/features/manager/supportAgent/components/DocsWithChunksTable/context";
import { DateTime } from "effect";

// assets
import { CalendarIcon } from "@heroicons/react/24/outline";

// types
interface CreatedAtProps {
  createdAt: AllDocsWithChunks["createdAt"];
}

export default function CreatedAt({ createdAt }: CreatedAtProps) {
  // Access the table context and retrieve all necessary information
  const { ll } = useInstanceContext();

  return (
    <section className="bg-background rounded-[255px_15px_225px_15px/15px_225px_15px_255px] p-4">
      <div className="flex items-center justify-center gap-2 uppercase">
        <CalendarIcon className="size-9" />
        {ll["Created At"]}
      </div>
      <p className="text-muted-foreground text-center">
        {DateTime.formatLocal(DateTime.unsafeFromDate(createdAt), { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
      </p>
    </section>
  );
}
