// next
import Link from "next/link";
import Image from "next/image";

// services, features, and other libraries
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// assets
import logoD from "@/assets/logoOnly.png";
import logoL from "@/assets/logoOnly.png";

export default function Logo() {
  // Determine whether the current theme is dark or light
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <Link href="/" title="Benefit Finance" className="flex-none">
      <Image src={isDarkMode ? logoD : logoL} alt="Benefit Finance" className={cn(!isDarkMode && "invert")} />
    </Link>
  );
}
