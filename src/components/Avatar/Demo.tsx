// react
import { Suspense } from "react";

// next
import { connection } from "next/server";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { getInitialsFromName, getRandomInt, getUserAvatarUrl } from "@/lib/helpers";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/custom/avatar";

// types
import type { ComponentPropsWithoutRef } from "react";

// constants
import { USERS } from "@/drizzle/seed/constants";

// Component remains the fast, static shell
export default function DemoAvatar(props: ComponentPropsWithoutRef<typeof Avatar>) {
  // If the user is a demo user, use a random and large avatar image (this is for the signing in as a demo user section only)
  return (
    <Suspense fallback={<DemoAvatarSkeleton {...props} />}>
      <DemoAvatarContent {...props} />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function DemoAvatarContent({ className, ...props }: ComponentPropsWithoutRef<typeof Avatar>) {
  await connection();

  // Filter only demo users, and pick a random one
  const demoUsers = USERS.filter((user) => user.role === "demo");
  const { name, email } = demoUsers[getRandomInt(0, demoUsers.length - 1)];

  return (
    <section className="grid">
      <Avatar className={cn("mx-auto size-74", className)} {...props}>
        <AvatarImage src={getUserAvatarUrl()} alt={name} />
        <AvatarFallback>{getInitialsFromName(name)}</AvatarFallback>
      </Avatar>
      <h4 className="mt-4 max-w-none truncate text-center">{name}</h4>
      <p className="text-muted-foreground max-w-none truncate text-center">{email}</p>
    </section>
  );
}

function DemoAvatarSkeleton({ className, ...props }: ComponentPropsWithoutRef<typeof Avatar>) {
  // Filter only demo users, and pick a random one
  const demoUsers = USERS.filter((user) => user.role === "demo");
  const { name, email } = demoUsers[0];

  return (
    <section className="grid">
      <Avatar className={cn("mx-auto size-74", className)} {...props}>
        <AvatarImage src="https://robohash.org/placeholder.png" alt={name} />
        <AvatarFallback>{getInitialsFromName(name)}</AvatarFallback>
      </Avatar>
      <h4 className="mt-4 max-w-none truncate text-center">{name}</h4>
      <p className="text-muted-foreground max-w-none truncate text-center">{email}</p>
    </section>
  );
}
