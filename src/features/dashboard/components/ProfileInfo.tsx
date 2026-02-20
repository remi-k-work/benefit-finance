// services, features, and other libraries
import { DateTime } from "effect";

// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import { UserAvatar } from "@/components/Avatar/User";

// assets
import { CalendarIcon } from "@heroicons/react/24/outline";

// types
import type { Session, User } from "@/services/better-auth/auth";
import type LangLoader from "@/lib/LangLoader";

interface ProfileInfoProps {
  user: User;
  session: Session;
  ll: typeof LangLoader.prototype.profileInfo;
}

export default function ProfileInfo({ user, user: { email, name, createdAt }, session, ll }: ProfileInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Profile Information"]}</CardTitle>
        <CardDescription>{ll["Your account details and current status"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <UserAvatar user={user} session={session} className="mx-auto size-74" />
        <h4 className="mx-auto mt-4 truncate text-center">{name}</h4>
        <p className="text-muted-foreground mx-auto truncate text-center">{email}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center gap-2 uppercase">
          <CalendarIcon className="size-9" />
          {ll["Member Since"]}
        </div>
        <p className="text-muted-foreground text-center">{DateTime.formatLocal(DateTime.unsafeFromDate(createdAt))}</p>
      </CardFooter>
    </Card>
  );
}
