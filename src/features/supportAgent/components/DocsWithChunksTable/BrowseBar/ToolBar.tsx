// next
import Link from "next/link";

// services, features, and other libraries
import { useInstanceContext } from "@/features/supportAgent/components/DocsWithChunksTable/context";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

export default function ToolBar() {
  // Access the table context and retrieve all necessary information
  const { ll } = useInstanceContext();

  return (
    <section className="flex flex-wrap items-center justify-around gap-4 *:basis-24">
      <Button
        variant="ghost"
        nativeButton={false}
        className="flex-col text-center whitespace-pre-line"
        render={
          <Link href="/manager/support-agent/new">
            <DocumentPlusIcon className="size-11" />
            {ll["New Document"].replaceAll(" ", "\n")}
          </Link>
        }
      ></Button>
    </section>
  );
}
