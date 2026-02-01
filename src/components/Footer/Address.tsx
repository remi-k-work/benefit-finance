// react
import { Suspense } from "react";

// next
import Image from "next/image";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";

// assets
import logoD from "@/assets/logoSm.png";

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { footerAddress: ll } = yield* LangLoader.createEffect();

  return { ll };
});

// Component remains the fast, static shell
export default function Address() {
  return (
    <Suspense fallback={<AddressSkeleton />}>
      <AddressContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function AddressContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { ll } = await runComponentMain(main);

  return (
    <section className="text-center">
      <h4 className="from-background via-primary to-background mx-auto mb-3 bg-linear-to-r p-1 text-center font-sans text-xl">
        {ll["Address and Headquarters"]}
      </h4>
      <Image src={logoD} alt="Benefit Finance" className="mx-auto mb-3 mix-blend-difference dark:mix-blend-screen" />
      <address>
        Mazowiecka 60A
        <br />
        35-324 Rzeszów
        <br />
        {ll["Poland"]}
      </address>
    </section>
  );
}

export function AddressSkeleton() {
  return (
    <section className="text-center">
      <h4 className="from-background via-primary to-background mx-auto mb-3 animate-pulse bg-linear-to-r p-1 text-center font-sans text-xl">&nbsp;</h4>
      <Image src={logoD} alt="Benefit Finance" className="mx-auto mb-3 mix-blend-difference dark:mix-blend-screen" />
      <address>
        Mazowiecka 60A
        <br />
        35-324 Rzeszów
        <br />
        &nbsp;
      </address>
    </section>
  );
}
