"use client";

// next
import dynamic from "next/dynamic";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { getInitialsFromName } from "@/lib/helpers";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/custom/avatar";

// types
import type { UserAvatarProps } from "./User";

// constants
import { USERS } from "@/drizzle/seed/constants";

export const UserAvatar = dynamic(() => import("./User"), { ssr: false });

export function UserAvatarSkeleton({ isSmall = false, className, ...props }: Omit<UserAvatarProps, "user" | "session">) {
  // Filter only demo users, and pick a random one
  const demoUsers = USERS.filter((user) => user.role === "demo");
  const { name } = demoUsers[0];

  return (
    <Avatar className={cn(isSmall && "size-11", className)} {...props}>
      <AvatarImage src="https://robohash.org/placeholder.png" alt={name} />
      <AvatarFallback className={cn(isSmall && "border-none text-2xl")}>{getInitialsFromName(name)}</AvatarFallback>
    </Avatar>
  );
}
