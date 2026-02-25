// react
import { useRef } from "react";

// next
import Form from "next/form";

// services, features, and other libraries
import { useInstanceContext } from "@/features/leads/components/AvailableLeadsTable/context";

// components
import { Badge } from "@/components/ui/custom/badge";
import { Input } from "@/components/ui/custom/input";
import { Button } from "@/components/ui/custom/button";

// assets
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  // Access the table context and retrieve all necessary information
  const {
    ll,
    table,
    state: { totalItems },
  } = useInstanceContext();

  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <Form action="/manager/leads" className="flex items-center gap-2">
      <Badge>{totalItems}</Badge>
      <Input ref={searchRef} type="search" name="search" size={20} maxLength={25} aria-label={ll["Search Leads"]} placeholder={ll["Search Leads"]} />
      <Button
        type="submit"
        size="icon"
        onClick={() => {
          table.resetColumnFilters();
          table.setGlobalFilter(searchRef.current?.value ?? "");
        }}
      >
        <MagnifyingGlassIcon className="size-11" />
      </Button>
    </Form>
  );
}
