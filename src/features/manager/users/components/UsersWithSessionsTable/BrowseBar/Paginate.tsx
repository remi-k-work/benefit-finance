// services, features, and other libraries
import { useInstanceContext } from "@/features/manager/supportAgent/components/DocsWithChunksTable/context";

// components
import { Button } from "@/components/ui/custom/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/custom/dropdown-menu";

// assets
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Paginate() {
  // Access the table context and retrieve all necessary information
  const {
    ll,
    table,
    state: { currentPage, totalPages },
  } = useInstanceContext();

  return (
    <section className="flex items-center gap-2">
      <Button type="button" size="icon" variant="ghost" title={ll["Previous Page"]} disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
        <ArrowLeftCircleIcon className="size-9" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            totalPages <= 1 ? (
              <Button type="button" variant="ghost" title={ll["Change Page"]} disabled>
                {currentPage}&nbsp;/&nbsp;{currentPage}
              </Button>
            ) : (
              <Button type="button" variant="ghost" title={ll["Change Page"]}>
                {currentPage}&nbsp;/&nbsp;{totalPages}
              </Button>
            )
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent>
          {[...Array(totalPages).keys()]
            .map((i) => i + 1)
            .map((pageNumber) =>
              pageNumber === currentPage ? (
                <DropdownMenuItem key={pageNumber} className="justify-between text-xl">
                  {pageNumber}
                  <CheckIcon className="size-6" />
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={pageNumber} className="text-xl" onClick={() => table.setPageIndex(pageNumber - 1)}>
                  {pageNumber}
                </DropdownMenuItem>
              ),
            )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button type="button" size="icon" variant="ghost" title={ll["Next Page"]} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
        <ArrowRightCircleIcon className="size-9" />
      </Button>
    </section>
  );
}
