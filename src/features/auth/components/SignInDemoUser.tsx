// components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/custom/card";
import DemoAvatar from "@/components/Avatar/Demo";
import SignInDemo from "./SignInDemo";

// types
import type { Route } from "next";
import type LangLoader from "@/lib/LangLoader";

interface SignInDemoUserProps {
  redirect?: Route;
  ll: typeof LangLoader.prototype.signInDemoUser;
  llSignInDemo: typeof LangLoader.prototype.signInDemo;
}

export default function SignInDemoUser({ redirect, ll, llSignInDemo }: SignInDemoUserProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Sign In as a Demo User"]}</CardTitle>
        <CardDescription>{ll["To test drive the application"]}</CardDescription>
      </CardHeader>
      <CardContent>
        <DemoAvatar />
      </CardContent>
      <CardFooter>
        <SignInDemo redirect={redirect} ll={llSignInDemo} />
      </CardFooter>
    </Card>
  );
}
