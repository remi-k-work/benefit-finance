// Load environment variables
import "dotenv/config";

// components
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from "@react-email/components";

// types
interface EmailChangeProps {
  newEmail: string;
  url: string;
}

EmailChange.PreviewProps = { newEmail: "john.doe@gmail.com", url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/approve-email` } satisfies EmailChangeProps;

export default function EmailChange({ newEmail, url }: EmailChangeProps) {
  return (
    <Html>
      <Head>
        <title>Benefit Finance ► Email Change</title>
      </Head>
      <Tailwind>
        <Body className="bg-white text-center font-sans text-black">
          <Preview>Benefit Finance ► Email Change</Preview>
          <Container className="mx-auto max-w-xl border-8 border-solid border-amber-950 p-0">
            <Section className="border-b-8 border-solid border-amber-950 bg-black">
              <Img src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/hero.png`} alt="Benefit Finance" width={1200} height={630} className="mx-auto h-72 w-auto" />
            </Section>
            <Section className="px-4">
              <Heading className="uppercase">Email Change</Heading>
              <Text>Your email has been changed to:</Text>
              <Text className="font-semibold">{newEmail}</Text>
              <Text>Click the link below to approve your new email:</Text>
              <Button href={url} className="bg-amber-950 px-5 py-3 font-semibold text-white uppercase no-underline">
                Approve Email
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
