// next
import { cookies } from "next/headers";

// services, features, and other libraries
import { Effect } from "effect";
import { getIronSession } from "iron-session";

// types
import type { CaptchaSession } from "@/app/api/captcha/[name]/route";

export class Captcha extends Effect.Service<Captcha>()("Captcha", {
  effect: Effect.gen(function* () {
    // Check the captcha to ensure it matches
    const isCaptchaValid = (captchaInput: string) =>
      Effect.gen(function* () {
        const cookies = yield* getCookies;
        return yield* Effect.promise(() =>
          getIronSession<CaptchaSession>(cookies, { password: process.env.SESSION_SECRET as string, cookieName: "captcha" }),
        ).pipe(
          Effect.andThen(({ captchaString }) => captchaInput === captchaString),
          Effect.orElseSucceed(() => false),
        );
      });

    return { isCaptchaValid } as const;
  }),
}) {}

const getCookies = Effect.promise(() => cookies());
