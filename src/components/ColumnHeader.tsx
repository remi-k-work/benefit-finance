// components
import { Button } from "@/components/ui/custom/button";

// assets
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

// types
import type { Column } from "@tanstack/react-table";

interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export default function ColumnHeader<TData, TValue>({ column, title, className }: ColumnHeaderProps<TData, TValue>) {
  return (
    <Button type="button" variant="ghost" onClick={column.getToggleSortingHandler()} className={className}>
      {title}
      {column.getIsSorted() ? (
        column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}

export function ColumnHeaderSkeleton<TData, TValue>({ title, className }: Omit<ColumnHeaderProps<TData, TValue>, "column">) {
  return (
    <Button type="button" variant="ghost" disabled className={className}>
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
