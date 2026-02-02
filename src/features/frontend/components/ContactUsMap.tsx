// react
import { Suspense } from "react";

// services, features, and other libraries
import { Effect } from "effect";
import LangLoader from "@/lib/LangLoader";
import { runComponentMain } from "@/lib/helpersEffect";

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";

const main = Effect.gen(function* () {
  // Create an instance of the lang loader needed for localization
  const { contactUsMap: ll } = yield* LangLoader.createEffect();

  return { ll };
});

// Component remains the fast, static shell
export default function ContactUsMap() {
  return (
    <Suspense fallback={<ContactUsMapSkeleton />}>
      <ContactUsMapContent />
    </Suspense>
  );
}

// This new async component contains the dynamic logic
async function ContactUsMapContent() {
  // Execute the main effect for the component, handle known errors, and return the payload
  const { ll } = await runComponentMain(main);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{ll["Address and Headquarters"]}</CardTitle>
        <CardDescription>{ll["SOBOLAK & PARTNERS"]}</CardDescription>
      </CardHeader>
      <CardContent className="size-full min-h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.4827165369115!2d22.047462576367415!3d50.039788016847496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfbe30b8e94a9%3A0x8421b4d546a55864!2sSOBOLAK%20%26%20PARTNERZY!5e0!3m2!1sen!2spl!4v1770057674082!5m2!1sen!2spl"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full"
        />
      </CardContent>
    </Card>
  );
}

export function ContactUsMapSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>&nbsp;</CardTitle>
        <CardDescription>&nbsp;</CardDescription>
      </CardHeader>
      <CardContent className="size-full min-h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.4827165369115!2d22.047462576367415!3d50.039788016847496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfbe30b8e94a9%3A0x8421b4d546a55864!2sSOBOLAK%20%26%20PARTNERZY!5e0!3m2!1sen!2spl!4v1770057674082!5m2!1sen!2spl"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full"
        />
      </CardContent>
    </Card>
  );
}
