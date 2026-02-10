"use client";

// react
import { useState } from "react";

// next
import Link from "next/link";

// components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/custom/popover";
import { Button } from "@/components/ui/custom/button";
import { UserAvatar, UserAvatarSkeleton } from "@/components/Avatar/User";
import SignOut from "./SignOut";

// assets
import { UserIcon } from "@heroicons/react/24/outline";

// types
import type { Session, User } from "@/services/better-auth/auth";
import type LangLoader from "@/lib/LangLoader";

interface UserPopoverProps {
  user: User;
  session: Session;
  ll: typeof LangLoader.prototype.userPopover;
}

export default function UserPopover({ user, user: { email, name }, session, ll }: UserPopoverProps) {
  // Whether or not the user popover is open
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        render={
          <Button type="button" variant="ghost" size="icon" title={name}>
            <UserAvatar user={user} session={session} isSmall />
          </Button>
        }
      ></PopoverTrigger>
      <PopoverContent className="grid">
        <UserAvatar user={user} session={session} className="mx-auto" />
        <h4 className="mt-4 truncate text-center">{name}</h4>
        <p className="text-muted-foreground truncate text-center">{email}</p>
        <div className="mt-4 grid gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              window.location.href = "/profile";
            }}
          >
            <UserIcon className="size-9" />
            {ll["Profile"]}
          </Button>
          <SignOut ll={ll} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function UserPopoverSkeleton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      title="Profile"
      nativeButton={false}
      render={
        <Link href="/sign-in?redirect=/dashboard">
          <UserAvatarSkeleton isSmall />
        </Link>
      }
    ></Button>
  );
}
