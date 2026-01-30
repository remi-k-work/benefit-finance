"use client";

// next
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

// assets
import logoD from "@/assets/logoOnly.png";

export const Logo = dynamic(() => import("./Logo"), { ssr: false });

export function LogoSkeleton() {
  return (
    <Link href="/" title="Benefit Finance" className="flex-none">
      <Image src={logoD} alt="Benefit Finance" />
    </Link>
  );
}
