// react
import { Suspense } from "react";

// next
import Image from "next/image";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import LangLoader from "@/lib/LangLoader";

// components

// assets
import logoD from "@/assets/logoSm.png";
import { DevicePhoneMobileIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

// types

// constants

// Component remains the fast, static shell
export default function Footer() {
  return (
    <Suspense fallback={<FooterSkeleton />}>
      <FooterContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function FooterContent() {
  // Create an instance of the lang loader needed for localization
  const { preferredLanguage, langChanger, navIconItems, themeChanger, userPopover } = await LangLoader.create();

  return (
    <footer className="from-background via-secondary to-background mt-8 grid grid-cols-1 gap-3 bg-linear-to-b p-2 [grid-area:footer] md:grid-cols-3">
      <section className="text-center">
        <h4 className="from-background via-primary to-background mx-auto mb-3 bg-linear-to-r p-1 text-center font-sans text-xl">Adres i Siedziba</h4>
        <Image src={logoD} alt="Benefit Finance" className="mx-auto mb-3 mix-blend-difference dark:mix-blend-screen" />
        <address>
          Mazowiecka 60A
          <br />
          35-324 Rzeszów
          <br />
          Polska
        </address>
      </section>
      <section className="text-center">
        <h4 className="from-background via-primary to-background mx-auto mb-3 bg-linear-to-r p-1 text-center font-sans text-xl">Na Skróty</h4>
      </section>
      <section className="text-center">
        <h4 className="from-background via-primary to-background mx-auto mb-3 bg-linear-to-r p-1 text-center font-sans text-xl">Zadzwoń lub Napisz do Nas</h4>
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
            <a href="mailto: info@benefit-finance.com">info@benefit-finance.com</a>
          </li>
        </ul>
      </section>
    </footer>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="from-background via-secondary to-background grid grid-cols-1 items-start gap-6 bg-linear-to-b p-2 [grid-area:footer] md:grid-cols-3">
      <p>&nbsp;</p>
    </footer>
  );
}
