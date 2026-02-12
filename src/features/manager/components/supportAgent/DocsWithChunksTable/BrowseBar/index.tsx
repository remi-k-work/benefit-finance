"use client";

// components
import Search from "./Search";
import Paginate from "./Paginate";
import ToolBar from "./ToolBar";

export default function BrowseBar() {
  return (
    <header className="via-secondary flex flex-wrap items-center justify-around gap-4 bg-linear-to-b from-transparent to-transparent px-3 py-6">
      <Search />
      <Paginate />
      <ToolBar />
    </header>
  );
}
