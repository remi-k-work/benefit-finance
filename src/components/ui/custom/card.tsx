import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, size = "default", ...props }: React.ComponentProps<"article"> & { size?: "default" | "sm" }) {
  return (
    <article
      data-slot="card"
      data-size={size}
      className={cn("bg-card text-card-foreground mx-auto flex w-full max-w-xl flex-col gap-6 border py-6", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-none px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("font-sans text-3xl leading-none uppercase", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-muted-foreground font-sans text-lg uppercase", className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<"aside">) {
  return <aside data-slot="card-action" className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return <footer data-slot="card-footer" className={cn("px-6", className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
