// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";

// assets
import { DevicePhoneMobileIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { footerContact: ll } = yield* LangLoader.createEffect();

  return { ll };
});

// Component remains the fast, static shell
export default function Contact() {
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <ContactContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function ContactContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { ll } = await runComponentMain(main);

  return (
    <section className="text-center">
      <h4 className="from-background via-primary to-background mx-auto mb-3 bg-linear-to-r p-1 text-center font-sans text-xl">{ll["Call or Write to Us"]}</h4>
      <ul className="flex flex-col items-center gap-2">
        <li className="flex items-center gap-2">
          <DevicePhoneMobileIcon className="size-9" />
          <a href="tel: +48 555 555 555">(+48) 555 555 555</a>
        </li>
        <li className="flex items-center gap-2">
          <PhoneIcon className="size-9" />
          <a href="tel: +48 17 555 55 55">(+48) 17 555 55 55</a>
        </li>
        <li className="flex items-center gap-2">
          <EnvelopeIcon className="size-9" />
          <a href="mailto: info@benefit-finance.com" className="link font-mono text-base font-normal normal-case">
            info@benefit-finance.com
          </a>
        </li>
      </ul>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section className="text-center">
      <h4 className="from-background via-primary to-background mx-auto mb-3 animate-pulse bg-linear-to-r p-1 text-center font-sans text-xl">&nbsp;</h4>
      <ul className="flex flex-col items-center gap-2">
        <li className="flex items-center gap-2">
          <DevicePhoneMobileIcon className="size-9" />
          <a href="tel: +48 555 555 555">(+48) 555 555 555</a>
        </li>
        <li className="flex items-center gap-2">
          <PhoneIcon className="size-9" />
          <a href="tel: +48 17 555 55 55">(+48) 17 555 55 55</a>
        </li>
        <li className="flex items-center gap-2">
          <EnvelopeIcon className="size-9" />
          <a href="mailto: info@benefit-finance.com" className="link font-mono text-base font-normal normal-case">
            info@benefit-finance.com
          </a>
        </li>
      </ul>
    </section>
  );
}
