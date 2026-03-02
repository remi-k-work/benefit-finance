// next
import Image from "next/image";

// assets
import hero from "@/features/contactUs/assets/hero.webp";

export default function Hero() {
  return <Image src={hero} alt="Contact Us" loading="eager" className="mx-auto mb-9 w-full max-w-300" />;
}
