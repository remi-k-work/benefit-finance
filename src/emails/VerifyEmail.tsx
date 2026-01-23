// Load environment variables
import "dotenv/config";

// components
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from "@react-email/components";

// types
interface VerifyEmailProps {
  url: string;
}

VerifyEmail.PreviewProps = { url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/verify-email` } satisfies VerifyEmailProps;

export default function VerifyEmail({ url }: VerifyEmailProps) {
  return (
    <Html>
      <Head>
        <title>Benefit Finance ► Verify Email</title>
      </Head>
      <Tailwind>
        <Body className="bg-white text-center font-sans text-black">
          <Preview>Benefit Finance ► Verify Email</Preview>
          <Container className="mx-auto max-w-xl border-8 border-solid border-amber-950 p-0">
            <Section className="border-b-8 border-solid border-amber-950 bg-black">
              <Img src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/hero.png`} alt="Benefit Finance" width={1200} height={630} className="mx-auto h-72 w-auto" />
            </Section>
            <Section className="px-4">
              <Heading className="uppercase">Verify Email</Heading>
              <Text>Click the link below to verify your email:</Text>
              <Button href={url} className="bg-amber-950 px-5 py-3 font-semibold text-white uppercase no-underline">
                Verify Email
              </Button>
            </Section>
            <Section className="mt-8 border-t-8 border-solid border-amber-950 bg-black px-4">
              <Img src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/logoLg.png`} alt="Benefit Finance" width={362} height={124} className="mx-auto my-3" />
              <Text className="my-3 text-white">Thanks, The Benefit Finance Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
