// next
import Link from "next/link";
import Image from "next/image";

// services, features, and other libraries
import { useTheme } from "next-themes";

// assets
import logoD from "@/assets/logoOnly.svg";
import logoL from "@/assets/logoOnly.svg";

export default function Logo() {
  // Determine whether the current theme is dark or light
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <Link href="/" title="Benefit Finance" className="flex-none">
      <Image src={isDarkMode ? logoD : logoL} alt="Benefit Finance" className="size-20 dark:mix-blend-hard-light" />
    </Link>
  );
}
