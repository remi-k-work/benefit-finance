// next
import Link from "next/link";

// services, features, and other libraries
import { useInstanceContext } from "@/features/leads/components/LeadsForReferrerTable/context";

// components
import { Button } from "@/components/ui/custom/button";

// assets
import { UserPlusIcon } from "@heroicons/react/24/outline";

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
          <Link href="/leads/new">
            <UserPlusIcon className="size-11" />
            {ll["New Lead"].replaceAll(" ", "\n")}
          </Link>
        }
      ></Button>
    </section>
  );
}
