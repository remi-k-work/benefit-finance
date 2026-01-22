// next
import Image from "next/image";

// assets
import logo from "@/assets/hero.png";

export default function Logo() {
  return <Image src={logo} alt="Benefit Finance" loading="eager" className="h-auto w-full object-contain" />;
}
