// next
import Link from "next/link";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { DocumentPlusIcon } from "@heroicons/react/24/outline";

export default function ToolBar() {
  return (
    <section className="flex flex-wrap items-center justify-around gap-4 *:basis-24">
      <Button
        variant="ghost"
        nativeButton={false}
        className="flex-col text-center whitespace-pre-line"
        render={
          <Link href="#">
            <DocumentPlusIcon className="size-11" />
            {"New Document".replaceAll(" ", "\n")}
          </Link>
        }
      ></Button>
    </section>
  );
}
