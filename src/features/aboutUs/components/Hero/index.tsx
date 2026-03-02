// next
import Image from "next/image";

// assets
import hero from "@/features/aboutUs/assets/hero.png";

export default function Hero() {
  return <Image src={hero} alt="Benefit Finance" loading="eager" className="mx-auto mb-9 w-full max-w-300" />;
}
