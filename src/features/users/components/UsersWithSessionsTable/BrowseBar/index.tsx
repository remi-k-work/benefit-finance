"use client";

// components
import Search from "./Search";
import Paginate from "./Paginate";

export default function BrowseBar() {
  return (
    <header className="from-background via-secondary to-background flex flex-wrap items-center justify-around gap-4 bg-linear-to-b px-3 py-6">
      <Search />
      <Paginate />
    </header>
  );
}
